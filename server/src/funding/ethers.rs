#![allow(unused)]
use crate::config;
use chrono::{DateTime, Utc};
use hex_literal::hex;
use std::str::FromStr;
use std::sync::Arc;
use web3::Web3;
use web3::contract::{Contract, Options};
use web3::signing::SecretKey;
use web3::types::{Address, H160, TransactionParameters, U256};

#[derive(Debug, Clone)]
pub struct FundingInfo {
    // pub address: H160,
    // pub owner: H160,
    // pub raised_amount: U256,
    // pub goal_amount: U256,
    pub deadline: U256,
    // pub deadline_date: DateTime<Utc>,
    pub is_funded: bool,
    pub contributors: Vec<H160>,
    pub contributions: Vec<(H160, U256)>,
}

const CONTRACT_ABI: &str = r#"[
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

pub async fn get_funding_info() -> web3::Result<()> {
    let conf = config::Config::default();

    // 웹3 인스턴스 생성
    let transport = web3::transports::Http::new(conf.rpc_url)?;
    let web3 = Web3::new(transport);

    let address = H160::from_str(conf.cont_addr)
        .map_err(|_| web3::Error::InvalidResponse("Invalid contract address".into()))?;

    tracing::info!("Contract address: {:?}", address);

    let contract =
        Contract::from_json(web3.eth(), address, CONTRACT_ABI.as_bytes()).map_err(|e| {
            web3::Error::InvalidResponse(format!("Failed to parse contract ABI: {:?}", e).into())
        })?;

    // tracing::info!("Contract: {:?}", contract);

    // FundingInfo 구조체 반환
    // Ok(FundingInfo {
    //     address,
    //     owner,
    //     raised_amount,
    //     goal_amount,
    //     deadline,
    //     deadline_date,
    //     is_funded,
    //     contributors,
    //     contributions,
    // })

    Ok(())
}

// 펀딩에 기여하기
pub async fn contribute_to_funding(
    contract_address: &str,
    private_key: &str,
    amount: i128,
    rpc_url: &str,
) -> web3::Result<()> {
    Ok(())
}

pub async fn deploy_new_funding(
    private_key: &str,
    rpc_url: &str,
    sbt_router: &str,
    goal: i128,
    duration: i128,
    token_uri: String,
) -> web3::Result<()> {
    Ok(())
}

// 펀딩 종료(finalize)
pub async fn finalize_funding(
    contract_address: &str,
    private_key: &str,
    rpc_url: &str,
) -> web3::Result<()> {
    Ok(())
}
