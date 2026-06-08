const mysql = require('mysql2/promise')
require('dotenv').config()

console.log('DB Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  hasPassword: !!process.env.DB_PASSWORD
})

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'railway',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
})

async function initDB() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS contact_messages (
      id         INT          AUTO_INCREMENT PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      email      VARCHAR(150) NOT NULL,
      message    TEXT         NOT NULL,
      created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
    )
  `
  try {
    await pool.execute(createTableSQL)
    console.log('✅ Database table ready: contact_messages')
  } catch (err) {
    console.error('❌ Failed to initialize database table:')
    console.error('Message:', err.message)
    console.error('Code:', err.code)
    process.exit(1)
  }
}

module.exports = { pool, initDB }