#[derive(Debug)]
pub struct Config {
    pub api_url: &'static str,
    pub api_key: &'static str,
    pub cron_schedule: &'static str,
    pub sbt_router: &'static str,
    pub rpc_url: &'static str,
    pub api_account: &'static str,
    pub api_pw: &'static str,
    pub api_skey: &'static str,
    pub api_nft_kit_id: &'static str,
    pub cont_addr: &'static str,
    pub cont_skey: &'static str,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            api_url: option_env!("API_URL").unwrap_or("http://localhost:8080"),
            api_key: option_env!("API_KEY").expect("API_KEY is required"),
            cron_schedule: option_env!("CRON_SCHEDULE").unwrap_or("0 * * * * *"),
            sbt_router: option_env!("SBT_ROUTER").unwrap_or("SBT_ROUTER is required"),
            rpc_url: option_env!("RPC_URL").unwrap_or("https://rpc.xrplevm.org"),
            api_account: option_env!("API_ACCOUNT").expect("API_ACCOUNT is required"),
            api_pw: option_env!("API_PW").expect("API_PW is required"),
            api_skey: option_env!("API_SKEY").expect("API_SKEY is required"),
            api_nft_kit_id: option_env!("API_NFT_KIT_ID").unwrap_or("30"),
            cont_addr: option_env!("CONTRACT_ADDR").expect("CONT_ADDR is required"),
            cont_skey: option_env!("CONTRACT_SKEY").expect("CONTRACT_SKEY is required"),
        }
    }
}
