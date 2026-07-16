// One-off CLI to (re)set a login's password as a bcrypt hash.
//
// The migration from ASP.NET switched password hashing from unsalted SHA256
// to bcrypt, which means any password hash created by the old app can no
// longer be verified. Run this once per existing account to give it a
// working bcrypt password.
//
// Usage:
//   npm run reset-password -- <email> <newPassword>

import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const [, , email, newPassword] = process.argv;

if (!email || !newPassword) {
  console.error("Usage: npm run reset-password -- <email> <newPassword>");
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "edusuite_db",
});

try {
  const hash = await bcrypt.hash(newPassword, 10);
  const [result] = await pool.query("UPDATE logins SET PasswordHash = ? WHERE Email = ?", [hash, email]);

  if (result.affectedRows === 0) {
    console.error(`No login found with email "${email}".`);
    process.exit(1);
  }

  console.log(`Password updated for ${email}.`);
} finally {
  await pool.end();
}
