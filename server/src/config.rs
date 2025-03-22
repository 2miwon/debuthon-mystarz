#[derive(Debug)]
pub struct Config {
    pub api_url: &'static str,
    pub api_key: &'static str,
    pub cron_schedule: &'static str,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            api_url: option_env!("API_URL").unwrap_or("http://localhost:8080"),
            api_key: option_env!("API_KEY").expect("API_KEY is required"),
            cron_schedule: option_env!("CRON_SCHEDULE").unwrap_or("0 * * * * *"),
        }
    }
}
