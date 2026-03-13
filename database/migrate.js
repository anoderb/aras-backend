const fs = require('fs');
const path = require('path');
const db = require('../src/config/database');

const jalankanMigrasi = async () => {
  const folderMigrasi = path.join(__dirname, 'migrations');
  
  try {
    // 1. Ambil semua file .sql dan urutkan berdasarkan nama (001, 002, dst)
    const files = fs.readdirSync(folderMigrasi)
      .filter(f => f.endsWith('.sql'))
      .sort();

    console.log(`📂 Ditemukan ${files.length} file migrasi.`);

    for (const file of files) {
      const filePath = path.join(folderMigrasi, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      console.log(`🚀 Menjalankan: ${file}...`);
      
      // Split query by semicolon (sederhana, pastikan SQL file bersih)
      // MySQL2 pool.query bisa menerima multiple statements jika diaktifkan, 
      // tapi lebih aman jalankan per file atau per statement.
      await db.query(sql);
      
      console.log(`✅ Selesai: ${file}`);
    }

    console.log('✨ SEMUA MIGRASI BERHASIL DIJALANKAN!');
    process.exit(0);
  } catch (err) {
    console.error('❌ MIGRASI GAGAL:', err.message);
    process.exit(1);
  }
};

jalankanMigrasi();
