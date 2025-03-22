#![allow(unused_imports)]
#![allow(unused_variables)]
use anyhow::Result;
use axum::{Router, routing::get};
use reqwest::Client;
use tokio::net::TcpListener;
use tokio_cron_scheduler::{Job, JobScheduler};

pub mod api;
pub mod config;
pub mod funding;
pub mod sqlite;

#[tokio::main]
async fn main() -> Result<()> {
    let _ = tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .with_file(true)
        .with_line_number(true)
        .with_thread_ids(true)
        .with_target(false)
        .try_init();

    let port = option_env!("PORT").unwrap_or("3000");
    let listener = TcpListener::bind(format!("0.0.0.0:{}", port))
        .await
        .unwrap();

    tracing::info!("listening on {}", listener.local_addr().unwrap());

    let app = make_app().await?;

    axum::serve(listener, app).await.unwrap();

    Ok(())
}

async fn make_app() -> Result<Router> {
    let conf = config::Config::default();
    // let _pool = sqlite::Database::new("sqlite://db/contracts.db").await?;
    let client = Client::new();

    let scheduler = JobScheduler::new().await?;

    let job = Job::new_async(conf.cron_schedule, move |_, _| {
        let client = client.clone();
        Box::pin(async move {
            match call_api(&client).await {
                Ok(_) => tracing::info!("API call successful"),
                Err(e) => tracing::error!("API call failed: {}", e),
            }
        })
    })?;

    scheduler.add(job).await?;
    scheduler.start().await?;

    let app = Router::new()
        .route("/", get(|| async { "Axum running!" }))
        .route("/test", get(mint_test))
        .route("/finalize", get(finalize_outer));
    // .nest("/funding", funding::Controller::new(conf, pool).router());

    Ok(app)
}

async fn mint_test() -> String {
    // "OK"
    match api::min_nft(
        "0xB8Bb795b364550281feb9037e70E366CEa379290".to_string(),
        "https://example.com".to_string(),
    )
    .await
    {
        Ok(hash) => hash,
        Err(e) => format!("Error: {}", e),
    }
}

async fn call_api(client: &Client) -> Result<(), Box<dyn std::error::Error>> {
    use chrono::Utc;

    let conf = config::Config::default();
    use funding::ethers::{finalize_funding, get_funding_info};

    let response = get_funding_info().await?;

    let now = Utc::now();
    tracing::info!("[{}]API response: {:?}", now, response);
    Ok(())
}

async fn finalize_outer() -> String {
    let conf = config::Config::default();
    match funding::ethers::finalize_funding(conf.cont_addr, conf.cont_skey, &conf.rpc_url).await {
        Ok(_) => "finalized".to_string(),
        Err(e) => format!("Error: {}", e),
    }
}
