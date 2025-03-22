use anyhow::Result;
use sqlx::{Pool, Row, Sqlite, sqlite::SqlitePool};
use std::fs;
use std::path::Path;

pub struct Database {
    pool: Pool<Sqlite>,
}

impl Database {
    pub async fn new(database_url: &str) -> Result<Self> {
        if let Some(parent) = Path::new(database_url.strip_prefix("sqlite://").unwrap()).parent() {
            fs::create_dir_all(parent)?;
        }

        let pool = SqlitePool::connect(database_url).await?;
        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS contracts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                address TEXT NOT NULL UNIQUE,
                deadline integer,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            "#,
        )
        .execute(&pool)
        .await?;
        Ok(Self { pool })
    }

    pub async fn insert_contract(&self, address: &str) -> Result<()> {
        sqlx::query("INSERT INTO contracts (address) VALUES (?)")
            .bind(address)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    pub async fn get_all_contracts(&self) -> Result<Vec<String>> {
        let rows = sqlx::query("SELECT address FROM contracts")
            .fetch_all(&self.pool)
            .await?;
        let addresses = rows
            .into_iter()
            .map(|row| row.get::<String, _>("address"))
            .collect();
        Ok(addresses)
    }
}
