use crate::config;
use reqwest::{Client, header};
use serde_json::{Value, json};
use std::error::Error;
use uuid::Uuid;

pub async fn min_nft(receiver: String, token_uri: String) -> Result<String, Box<dyn Error>> {
    let conf = config::Config::default();
    let id = Uuid::new_v4().to_string();
    let client = Client::new();

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
                    "tokenId": id,
                    "tokenUri": token_uri.to_string(),
                }
            ],
            "secretKey": conf.api_skey,
            "password": conf.api_pw

        }))
        .send()
        .await?;

    let response_json: Value = response.json().await?;
    tracing::info!("API response: {:?}", response_json);
    if let Some(transaction_hash) = response_json
        .get("transaction_hash")
        .and_then(|v| v.as_str())
    {
        Ok(transaction_hash.to_string())
    } else {
        Err("Missing transaction_hash in response".into())
    }
}
