use tauri_plugin_sql::{Migration, MigrationKind};

const CREATE_SALARIES_TABLE_SQL: &str = "
CREATE TABLE IF NOT EXISTS salaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL
);
";

const CREATE_BILLS_TABLE_SQL: &str = "
CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL,
    status BOOLEAN NOT NULL DEFAULT 0
);
";

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    match std::env::current_dir() {
        Ok(path) => println!("Current directory: {}", path.display()),
        Err(e) => eprintln!("Error getting current directory: {}", e),
    }

    let migrations = vec![
        Migration {
            version: 1,
            description: "init_salaries",
            sql: CREATE_SALARIES_TABLE_SQL,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "init_bills",
            sql: CREATE_BILLS_TABLE_SQL,
            kind: MigrationKind::Up,
        },
    ];

    let sql_plugin = tauri_plugin_sql::Builder::new()
        .add_migrations("sqlite://./database.db", migrations)
        .build();

    tauri::Builder::default()
        .plugin(sql_plugin)
        .run(tauri::generate_context!())
        .expect("error while running tauari application");
}
