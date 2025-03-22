use anyhow::Result;
use axum::{Router, routing::get};
use reqwest::Client;
use tokio::net::TcpListener;
use tokio_cron_scheduler::{Job, JobScheduler};

pub mod config;

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
        .route("/health", get(health_check));

    Ok(app)
}

async fn health_check() -> &'static str {
    "OK"
}

async fn call_api(client: &Client) -> Result<()> {
    let conf = config::Config::default();
    // 여기에 API 호출 로직 구현
    let response = client.get(conf.api_url).send().await?;

    if response.status().is_success() {
        tracing::info!("API call successful: {:?}", response.status());
    } else {
        tracing::warn!("API call returned non-success: {:?}", response.status());
    }

    Ok(())
}
