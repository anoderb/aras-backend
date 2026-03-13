const mysql = require('mysql2/promise');
const config = require('./app.config');

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  port: config.db.port,
  waitForConnections: true,
  connectionLimit: config.db.poolMax || 10,
  queueLimit: 0,
});

// Test Koneksi
const testKoneksi = async () => {
  try {
    const koneksi = await pool.getConnection();
    console.log('✅ Database MySQL Terhubung!');
    koneksi.release();
  } catch (err) {
    console.error('❌ Database MySQL Gagal Terhubung:', err.message);
  }
};

testKoneksi();

module.exports = pool;
