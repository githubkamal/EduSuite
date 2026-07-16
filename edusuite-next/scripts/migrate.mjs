// Applies every .sql file in migrations/ (in filename order) against the
// configured database. Each file is expected to be idempotent (e.g. using
// `ADD COLUMN IF NOT EXISTS`) since there is no migrations-tracking table —
// this is a thin convenience wrapper, not a full migration framework.
//
// Usage:
//   npm run migrate

import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

const migrationsDir = new URL("../migrations", import.meta.url).pathname.replace(/^\/(\w:)/, "$1");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "edusuite_db",
  multipleStatements: true,
});

try {
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
    console.log(`Applying ${file}...`);
    await pool.query(sql);
  }

  console.log(`Done. Applied ${files.length} migration file(s).`);
} finally {
  await pool.end();
}
