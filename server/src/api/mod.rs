#![allow(dead_code)]
#![allow(unused_imports)]
#![allow(unused_variables)]
use crate::config;
use rand::Rng;
use reqwest::{Client, header};
use serde_json::{Value, json};
use std::error::Error;

pub async fn min_nft(receiver: String, token_uri: String) -> Result<String, Box<dyn Error>> {
    let conf = config::Config::default();
    let client = Client::new();
    let id: i64 = rand::rng().random_range(1_000_000_000_000..10_000_000_000_000);

    tracing::info!("Generated ID: {}", id);
    let response = client
        .post(format!(
            "{}/v1/nft-kits/{}/issuances/issue?accountId={}",
            conf.api_url, conf.api_nft_kit_id, conf.api_account
        ))
        .header("x-eq-ag-api-key", conf.api_key)
        .header(header::CONTENT_TYPE, "application/json")
        .header(header::USER_AGENT, "reqwest")
        // .header(header::CONNECTION, "close")
        .json(&json!({
            "issuanceObjects": [
                {
                    "recipient": receiver,
                    "tokenId": id.to_string(),
                    "tokenUri": token_uri.to_string(),
                }
            ],
            "secretKey": conf.api_skey,
            "password": conf.api_pw

        }))
        .send()
        .await?;

    // let response_json: Value = response.json().await?;
    // tracing::info!("API response: {:?}", response_json);
    // if let Some(transaction_hash) = response_json
    //     .get("transaction_hash")
    //     .and_then(|v| v.as_str())
    // {
    //     Ok(transaction_hash.to_string())
    // } else {
    //     Err("Missing transaction_hash in response".into())
    // }

    if response.status().is_success() {
        Ok(id.to_string())
    } else {
        Err("API call failed".into())
    }
}
