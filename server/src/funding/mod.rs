mod ethers;
use crate::config::Config;
use axum::{Router, response::Json};
use sqlx::{Pool, Sqlite};
use std::error::Error;

pub struct Controller {
    config: Config,
    pool: Pool<Sqlite>,
}

impl Controller {
    pub fn new(config: Config, pool: Pool<Sqlite>) -> Self {
        Controller { config, pool }
    }

    pub fn router(&self) -> Router {
        Router::new()
            .route("/", get(Self::get_all_contracts))
            .route("/deploy", post(Self::deploy_new_funding))
            .route("/contribute", post(Self::contribute_to_funding))
            .route("/finalize", post(Self::finalize_funding))
    }

    pub async fn deploy_new_funding(
        &self,
        contract_address: &str,
        private_key: &str,
        goal: i128,
        duration: i128,
        token_uri: String,
    ) -> Result<Json<()>, Box<dyn Error>> {
        ethers::deploy_new_funding(
            private_key,
            &self.config.rpc_url,
            &self.config.sbt_router,
            goal,
            duration,
            token_uri,
        )
        .await
    }

    pub async fn contribute_to_funding(
        &self,
        contract_address: &str,
        private_key: &str,
        amount: i128,
    ) -> Result<Json<()>, Box<dyn Error>> {
        ethers::contribute_to_funding(contract_address, private_key, amount, &self.config.rpc_url)
            .await
    }

    pub async fn finalize_funding(
        &self,
        contract_address: &str,
        private_key: &str,
    ) -> Result<Json<()>, Box<dyn Error>> {
        ethers::finalize_funding(contract_address, private_key, &self.config.rpc_url).await
    }
}

impl Controller {
    pub async fn get_all_contracts(&self) -> Vec<String> {
        let contracts = self.pool.get_all_contracts().await.unwrap();
        contracts
    }
}
