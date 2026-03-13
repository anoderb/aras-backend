const mysql = require('mysql2/promise');
const config = require('./app.config');

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.pass,
  database: config.db.nama,
  port: config.db.port,
  waitForConnections: true,
  connectionLimit: config.db.poolMax || 10,
  queueLimit: 0,
  multipleStatements: true,
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
