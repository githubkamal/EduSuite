// Creates (or updates the password of) an Admin-role login. RoleId 1 = Admin
// (seeded in the `roles` table). Admin accounts have no Staff/Student profile
// row — the login's full name falls back to "Administrator" at login time.
//
// Usage:
//   npm run create-admin -- <email> <password>

import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error("Usage: npm run create-admin -- <email> <password>");
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
  const hash = await bcrypt.hash(password, 10);

  const [existing] = await pool.query("SELECT Id FROM logins WHERE Email = ?", [email]);

  if (existing.length > 0) {
    await pool.query("UPDATE logins SET PasswordHash = ?, RoleId = 1, IsActive = 1 WHERE Email = ?", [hash, email]);
    console.log(`Existing login ${email} updated to Admin with a new password.`);
  } else {
    await pool.query(
      "INSERT INTO logins (PasswordHash, Email, RoleId, IsActive) VALUES (?, ?, 1, 1)",
      [hash, email]
    );
    console.log(`Admin account created for ${email}.`);
  }
} finally {
  await pool.end();
}
