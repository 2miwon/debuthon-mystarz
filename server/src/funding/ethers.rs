use chrono::{DateTime, Utc};
use std::str::FromStr;
use web3::Web3;
use web3::contract::{Contract, Options};
use web3::signing::SecretKey;
use web3::types::{Address, H160, TransactionParameters, U256};

// Funding 정보를 담을 구조체
#[derive(Debug, Clone)]
pub struct FundingInfo {
    pub address: H160,
    pub owner: H160,
    pub raised_amount: U256,
    pub goal_amount: U256,
    pub deadline: U256,
    pub deadline_date: DateTime<Utc>,
    pub is_funded: bool,
    pub contributors: Vec<H160>,
    pub contributions: Vec<(H160, U256)>,
}

// ABI 파일 로드 (JSON 문자열)
const FUNDING_ABI: &str = r#"[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sbtRouterContract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_goalAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_duration",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_tokenURI",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "contributor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "ContributionReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalRaised",
          "type": "uint256"
        }
      ],
      "name": "FundingFinalized",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "SBTtokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contribute",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "contribution",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "contributors",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deadline",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "finalize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "goalAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isFunded",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "raisedAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sbtRouterContract",
      "outputs": [
        {
          "internalType": "contract SBTRouter",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]"#;

// 펀딩 정보 조회 함수
pub async fn get_funding_info(contract_address: &str, rpc_url: &str) -> web3::Result<FundingInfo> {
    // 웹3 인스턴스 생성
    let transport = web3::transports::Http::new(rpc_url)?;
    let web3 = Web3::new(transport);

    // 컨트랙트 주소 파싱
    let address = H160::from_str(contract_address).expect("유효하지 않은 주소");

    // 컨트랙트 인스턴스 생성
    let contract = Contract::from_json(web3.eth(), address, FUNDING_ABI.as_bytes())?;

    // 컨트랙트 정보 조회
    let owner: H160 = contract
        .query("owner", (), None, Options::default(), None)
        .await?;
    let raised_amount: U256 = contract
        .query("raisedAmount", (), None, Options::default(), None)
        .await?;
    let goal_amount: U256 = contract
        .query("goalAmount", (), None, Options::default(), None)
        .await?;
    let deadline: U256 = contract
        .query("deadline", (), None, Options::default(), None)
        .await?;
    let is_funded: bool = contract
        .query("isFunded", (), None, Options::default(), None)
        .await?;

    // 타임스탬프를 날짜로 변환
    let deadline_secs = deadline.as_u64() as i64;
    let deadline_date =
        DateTime::<Utc>::from_timestamp(deadline_secs, 0).unwrap_or_else(|| Utc::now());

    // 기여자 목록 조회
    let mut contributors = Vec::new();
    let mut contributions = Vec::new();
    let mut index = 0u64;

    loop {
        let result: Result<H160, _> = contract
            .query(
                "contributors",
                (U256::from(index),),
                None,
                Options::default(),
                None,
            )
            .await;

        match result {
            Ok(contributor) => {
                contributors.push(contributor);

                // 기여 금액 조회
                let amount: Result<U256, _> = contract
                    .query(
                        "contribution",
                        (contributor,),
                        None,
                        Options::default(),
                        None,
                    )
                    .await;

                if let Ok(amount) = amount {
                    contributions.push((contributor, amount));
                }

                index += 1;
            }
            Err(_) => break,
        }
    }

    // FundingInfo 구조체 반환
    Ok(FundingInfo {
        address,
        owner,
        raised_amount,
        goal_amount,
        deadline,
        deadline_date,
        is_funded,
        contributors,
        contributions,
    })
}

// 펀딩에 기여하기
pub async fn contribute_to_funding(
    contract_address: &str,
    private_key: &str,
    amount: i128,
    rpc_url: &str,
) -> web3::Result<()> {
    // 웹3 인스턴스 생성
    let transport = web3::transports::Http::new(rpc_url)?;
    let web3 = Web3::new(transport);

    // 개인 키로 계정 생성
    let private_key = private_key.trim_start_matches("0x");
    let private_key_bytes = hex::decode(private_key).expect("유효하지 않은 개인 키");
    let secret_key = SecretKey::from_slice(&private_key_bytes)?;

    // 계정 주소 계산
    let address = secret_key.address();

    // 컨트랙트 주소
    let contract_address = H160::from_str(contract_address).expect("유효하지 않은 계약 주소");

    // 컨트랙트 인스턴스
    let contract = Contract::from_json(web3.eth(), contract_address, FUNDING_ABI.as_bytes())?;

    // 트랜잭션 데이터 생성
    let data = contract
        .abi()
        .function("contribute")
        .expect("함수를 찾을 수 없음")
        .encode_input(&[])?;

    // 가스 가격
    let gas_price = web3.eth().gas_price().await?;

    // 논스 가져오기
    let nonce = web3.eth().transaction_count(address, None).await?;

    // 트랜잭션 파라미터 구성
    let tx_params = TransactionParameters {
        to: Some(contract_address),
        value: U256::from(amount as u128),
        gas_price: Some(gas_price),
        gas: U256::from(200_000),
        nonce: Some(nonce),
        data: data,
        chain_id: Some(1440002), // 체인 ID 설정
        ..Default::default()
    };

    // 트랜잭션 서명 및 전송
    let signed = web3
        .accounts()
        .sign_transaction(tx_params, &secret_key)
        .await?;
    let tx_hash = web3
        .eth()
        .send_raw_transaction(signed.raw_transaction)
        .await?;

    println!("기여 트랜잭션 해시: {:?}", tx_hash);

    let receipt = web3.eth().transaction_receipt(tx_hash).await?;
    if let Some(receipt) = receipt {
        println!("트랜잭션이 블록에 포함됨: {:?}", receipt.block_number);
    }

    Ok(())
}

// 펀딩 종료(finalize)
pub async fn finalize_funding(
    contract_address: &str,
    private_key: &str,
    rpc_url: &str,
) -> web3::Result<()> {
    // 웹3 인스턴스 생성
    let transport = web3::transports::Http::new(rpc_url)?;
    let web3 = Web3::new(transport);

    // 개인 키로 계정 생성
    let private_key = private_key.trim_start_matches("0x");
    let private_key_bytes = hex::decode(private_key).expect("유효하지 않은 개인 키");
    let secret_key = SecretKey::from_slice(&private_key_bytes)?;

    // 계정 주소 계산
    let address = secret_key.address();
    tracing::info!("발신자 주소: {:?}", address);

    // 컨트랙트 주소
    let contract_address = H160::from_str(contract_address).expect("유효하지 않은 계약 주소");

    // 컨트랙트 인스턴스
    let contract = Contract::from_json(web3.eth(), contract_address, FUNDING_ABI.as_bytes())?;

    // 트랜잭션 데이터 생성
    let data = contract
        .abi()
        .function("finalize")
        .expect("함수를 찾을 수 없음")
        .encode_input(&[])?;

    // 가스 가격
    let gas_price = web3.eth().gas_price().await?;

    // 논스 가져오기
    let nonce = web3.eth().transaction_count(address, None).await?;

    // 트랜잭션 파라미터 구성
    let tx_params = TransactionParameters {
        to: Some(contract_address),
        value: U256::from(0),
        gas_price: Some(gas_price),
        gas: U256::from(500_000),
        nonce: Some(nonce),
        data: data,
        chain_id: Some(1440002), // 체인 ID 설정
        ..Default::default()
    };

    tracing::info!("finalize 트랜잭션 준비 중...");

    // 트랜잭션 서명 및 전송
    let signed = web3
        .accounts()
        .sign_transaction(tx_params, &secret_key)
        .await?;
    let tx_hash = web3
        .eth()
        .send_raw_transaction(signed.raw_transaction)
        .await?;

    tracing::info!("finalize 트랜잭션 해시: {:?}", tx_hash);

    let receipt = web3.eth().transaction_receipt(tx_hash).await?;
    if let Some(receipt) = receipt {
        tracing::info!("트랜잭션이 블록에 포함됨: {:?}", receipt.block_number);
    }

    Ok(())
}
