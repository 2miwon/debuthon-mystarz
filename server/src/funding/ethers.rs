use chrono::{DateTime, Utc};
use ethers::contract::abigen;
use ethers::prelude::*;
use ethers::types::U256;
use funty::Fundamental;
use std::str::FromStr;
use std::sync::Arc;

// Funding 컨트랙트와 상호작용하기 위한 ABI 생성
abigen!(
    FundingContract,
    r#"[
        constructor(address _sbtRouterContract, uint256 _goalAmount, uint256 _duration, string memory _tokenURI)
        function SBTtokenURI() external view returns (string)
        function contribute() external payable
        function contribution(address) external view returns (uint256)
        function contributors(uint256) external view returns (address)
        function deadline() external view returns (uint256)
        function finalize() external
        function goalAmount() external view returns (uint256)
        function isFunded() external view returns (bool)
        function owner() external view returns (address payable)
        function raisedAmount() external view returns (uint256)
        function sbtRouterContract() external view returns (address)
    ]"#
);

#[derive(Debug, Clone)]
pub struct FundingInfo {
    pub address: Address,
    pub owner: Address,
    pub raised_amount: U256,
    pub goal_amount: U256,
    pub deadline: U256,
    pub deadline_date: DateTime<Utc>,
    pub is_funded: bool,
    // pub token_uri: String,
    pub contributors: Vec<Address>,
    pub contributions: Vec<(Address, U256)>,
}

pub async fn get_funding_info(
    contract_address: &str,
    rpc_url: &str,
) -> Result<FundingInfo, Box<dyn std::error::Error>> {
    // 프로바이더 설정
    let provider = Provider::<Http>::try_from(rpc_url)?;
    let provider = Arc::new(provider);

    // 문자열 주소를 Address 타입으로 변환
    let address = Address::from_str(contract_address)?;

    // 컨트랙트 인스턴스 생성
    let funding = FundingContract::new(address, provider);

    // 컨트랙트 정보 가져오기
    let owner = funding.owner().call().await?;
    let raised_amount = funding.raised_amount().call().await?;
    let goal_amount = funding.goal_amount().call().await?;
    let deadline = funding.deadline().call().await?;
    let is_funded = funding.is_funded().call().await?;
    // let token_uri = funding.sbt_token_uri().call().await?;

    // 타임스탬프를 사람이 읽을 수 있는 날짜로 변환
    let deadline_secs = deadline.as_u64() as i64;
    let deadline_date =
        DateTime::<Utc>::from_timestamp(deadline_secs, 0).unwrap_or_else(|| Utc::now());

    // 기여자 목록 가져오기
    let mut contributors = Vec::new();
    let mut contributions = Vec::new();
    let mut index = 0u64;

    loop {
        match funding.contributors(U256::from(index)).call().await {
            Ok(contributor) => {
                contributors.push(contributor);

                if let Ok(amount) = funding.contribution(contributor).call().await {
                    contributions.push((contributor, amount));
                }

                index += 1;
            }
            Err(_) => break,
        }
    }

    Ok(FundingInfo {
        address,
        owner,
        raised_amount,
        goal_amount,
        deadline,
        deadline_date,
        is_funded,
        // token_uri,
        contributors,
        contributions,
    })
}

pub fn print_funding_info(funding: &FundingInfo) {
    println!("===== Funding 컨트랙트 정보 =====");
    println!("주소: {}", funding.address);
    println!("소유자: {}", funding.owner);
    println!(
        "목표 금액: {} wei ({} ETH)",
        funding.goal_amount,
        ethers::utils::format_ether(funding.goal_amount)
    );
    println!(
        "모인 금액: {} wei ({} ETH)",
        funding.raised_amount,
        ethers::utils::format_ether(funding.raised_amount)
    );
    println!(
        "마감 시간: {} ({})",
        funding.deadline, funding.deadline_date
    );
    println!("펀딩 완료 여부: {}", funding.is_funded);
    // println!("SBT 토큰 URI: {}", funding.token_uri);
    println!("기여자 수: {}", funding.contributors.len());

    // 펀딩 진행률 계산
    let progress = if funding.goal_amount.is_zero() {
        100.0
    } else {
        (funding.raised_amount.as_u128() as f64 / funding.goal_amount.as_u128() as f64) * 100.0
    };

    println!("펀딩 진행률: {:.2}%", progress);

    // 남은 시간 계산
    let now = Utc::now().timestamp() as u64;
    let deadline_secs = funding.deadline.as_u64();

    if now < deadline_secs {
        let remaining = deadline_secs - now;
        let days = remaining / 86400;
        let hours = (remaining % 86400) / 3600;
        let minutes = (remaining % 3600) / 60;
        println!("남은 시간: {}일 {}시간 {}분", days, hours, minutes);
    } else {
        println!("펀딩 기간 종료");
    }

    // 기여자 목록 출력
    println!("\n기여자 목록:");
    for (i, (contributor, amount)) in funding.contributions.iter().enumerate() {
        println!(
            "  {}. {} - {} wei ({} ETH)",
            i + 1,
            contributor,
            amount,
            ethers::utils::format_ether(*amount)
        );
    }
}

pub async fn contribute_to_funding(
    contract_address: &str,
    private_key: &str,
    amount: i128,
    rpc_url: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    // 프로바이더 설정
    let provider = Provider::<Http>::try_from(rpc_url)?;
    let provider = Arc::new(provider);

    // 지갑 설정
    let wallet = private_key.parse::<LocalWallet>()?;
    let client = SignerMiddleware::new(provider, wallet);
    let client = Arc::new(client);

    // 컨트랙트 주소 파싱
    let address = Address::from_str(contract_address)?;

    // 컨트랙트 인스턴스 생성
    let contract = FundingContract::new(address, client.clone());

    // 기여 트랜잭션 보내기
    println!("{}Wei 만큼 기여하는 중...", amount);
    let amount = U256::from(amount as u128);
    let tx = contract.contribute().value(amount);
    let pending_tx = tx.send().await?;

    // 트랜잭션 영수증 가져오기
    let receipt = pending_tx.await?;
    println!("기여 완료: 트랜잭션 해시 = {:?}", receipt.transaction_hash);

    Ok(())
}

// 펀딩 종료(finalize) 함수
pub async fn finalize_funding(
    contract_address: &str,
    private_key: &str,
    rpc_url: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    // 프로바이더 설정
    let provider = Provider::<Http>::try_from(rpc_url)?;
    let provider = Arc::new(provider);

    // 지갑 설정
    let wallet = private_key.parse::<LocalWallet>()?;
    let client = SignerMiddleware::new(provider, wallet);
    let client = Arc::new(client);

    // 컨트랙트 주소 파싱
    let address = Address::from_str(contract_address)?;

    // 컨트랙트 인스턴스 생성
    let contract = FundingContract::new(address, client.clone());

    // 펀딩 종료 트랜잭션 보내기
    let tx = contract.finalize();
    let pending_tx = tx.send().await?;

    // 트랜잭션 영수증 가져오기
    let receipt = match pending_tx.await? {
        TransactionReceipt::Mined(receipt) => receipt,
        _ => tracing::error!("their are no mined receipt"),
    };

    Ok(receipt.transaction_hash)
}

pub async fn deploy_new_funding(
    private_key: &str,
    rpc_url: &str,
    sbt_router_address: &str,
    goal_amount: i128,
    duration_seconds: i128,
    token_uri: String,
) -> Result<Address, Box<dyn std::error::Error>> {
    // 프로바이더 설정
    let provider = Provider::<Http>::try_from(rpc_url)?;
    let provider = Arc::new(provider);

    // 지갑 설정
    let wallet = private_key.parse::<LocalWallet>()?;
    let chain_id = provider.get_chainid().await?.as_u64();
    let wallet = wallet.with_chain_id(chain_id);

    // 클라이언트 설정
    let client = SignerMiddleware::new(provider, wallet);
    let client = Arc::new(client);

    // SBT 라우터 주소 변환
    let sbt_router = sbt_router_address.parse::<Address>()?;

    println!("새로운 Funding 컨트랙트 배포 중...");
    println!("SBT Router 주소: {}", sbt_router);
    println!("목표 금액: {} Wei", goal_amount);
    println!(
        "펀딩 기간: {} 초 ({:.1} 일)",
        duration_seconds,
        duration_seconds.as_f64() as f64 / 86400.0
    );
    // println!("토큰 URI: {}", token_uri);

    let goal_amount = U256::from(goal_amount as u128);
    let duration_seconds = U256::from(duration_seconds as u128);
    // 컨트랙트 배포
    let constructor_args = (sbt_router, goal_amount, duration_seconds, token_uri);

    let factory = FundingContract::deploy(client, constructor_args)?
        .gas(5_000_000u64) // 가스 한도 설정
        .send()
        .await?;

    let contract_address = factory.address();
    println!("Funding 컨트랙트 배포 완료!");
    println!("컨트랙트 주소: {}", contract_address);

    Ok(contract_address)
}
