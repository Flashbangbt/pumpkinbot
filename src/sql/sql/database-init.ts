import Database from 'better-sqlite3';

const db = new Database('./database.db', { verbose: console.log });

// Table creation statements
const initializeTables = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS command_groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_name TEXT UNIQUE NOT NULL
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS commands (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            command_name TEXT UNIQUE NOT NULL,
            group_id INTEGER,
            FOREIGN KEY (group_id) REFERENCES command_groups(id)
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS timed_commands (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_name TEXT NOT NULL,
            cron_expression TEXT NOT NULL,
            FOREIGN KEY (group_name) REFERENCES command_groups(group_name)
        )
    `).run();
};

initializeTables();
export default db;