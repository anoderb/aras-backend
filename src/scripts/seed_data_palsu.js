require('dotenv').config();
const db = require('../config/database');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    console.log('🌱 Memulai seeding data...');

    // 1. Hapus data lama (opsional, hati-hati jika di production)
    // console.log('🗑️ Menghapus data lama...');
    // await db.query('SET FOREIGN_KEY_CHECKS = 0');
    // await db.query('TRUNCATE TABLE komentar');
    // await db.query('TRUNCATE TABLE postingan');
    // await db.query('TRUNCATE TABLE artikel');
    // await db.query('TRUNCATE TABLE profil_dokter');
    // await db.query('TRUNCATE TABLE pengguna');
    // await db.query('SET FOREIGN_KEY_CHECKS = 1');

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash('Password123!', salt);

    // 2. Seed Pengguna
    console.log('👤 Seeding pengguna...');
    const [userResult] = await db.query(
      `INSERT INTO pengguna (nama, email, no_telepon, kata_sandi, peran, status_aktif) VALUES 
      (?, ?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?, ?)`,
      [
        'Admin Aras', 'admin@aras.com', '081234567890', passwordHash, 'admin', true,
        'Dr. Budi Santoso', 'budi@aras.com', '081234567891', passwordHash, 'dokter', true,
        'User Testing', 'user@aras.com', '081234567892', passwordHash, 'user', true
      ]
    );

    const adminId = userResult.insertId;
    const dokterId = userResult.insertId + 1;
    const userId = userResult.insertId + 2;

    // 3. Seed Profil Dokter
    console.log('🩺 Seeding profil dokter...');
    const [dokterProfileResult] = await db.query(
      `INSERT INTO profil_dokter (pengguna_id, no_str, no_sip, spesialisasi, pengalaman_tahun, bio, status_verifikasi, status_online) VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?)`,
      [dokterId, 'STR123456789', 'SIP987654321', 'Spesialis Penyakit Dalam', 10, 'Dokter berpengalaman di bidang penyakit dalam selama lebih dari 10 tahun.', 'terverifikasi', true]
    );
    const profilDokterId = dokterProfileResult.insertId;

    // 4. Seed Artikel
    console.log('📰 Seeding artikel...');
    await db.query(
      `INSERT INTO artikel (dokter_id, judul, isi, ringkasan, kategori, status, tgl_terbit) VALUES 
      (?, ?, ?, ?, ?, ?, NOW()),
      (?, ?, ?, ?, ?, ?, NOW())`,
      [
        profilDokterId, 'Tips Menjaga Kesehatan Jantung', 'Isi artikel tentang kesehatan jantung...', 'Ringkasan kesehatan jantung', 'penyakit', 'diterbitkan',
        profilDokterId, 'Pentingnya Nutrisi Seimbang', 'Isi artikel tentang nutrisi...', 'Ringkasan nutrisi seimbang', 'nutrisi', 'diterbitkan'
      ]
    );

    // 5. Seed Postingan Diskusi
    console.log('💬 Seeding postingan diskusi...');
    const [postResult] = await db.query(
      `INSERT INTO postingan (pengguna_id, isi, kategori, status) VALUES 
      (?, ?, ?, ?),
      (?, ?, ?, ?)`,
      [
        userId, 'Bagaimana cara mengatasi susah tidur ya?', 'mental_health', 'aktif',
        dokterId, 'Jangan lupa minum air putih minimal 2 liter sehari ya teman-teman.', 'nutrisi', 'aktif'
      ]
    );
    const postId = postResult.insertId;

    // 6. Seed Komentar
    console.log('🗨️ Seeding komentar...');
    await db.query(
      `INSERT INTO komentar (postingan_id, pengguna_id, isi, status) VALUES 
      (?, ?, ?, ?)`,
      [postId, dokterId, 'Coba kurangi konsumsi kafein di sore hari dan buat jadwal tidur yang teratur.', 'aktif']
    );

    // 7. Seed Forum
    console.log('🏛️ Seeding forum...');
    const [forumResult] = await db.query(
      `INSERT INTO forum_pertanyaan (pengguna_id, judul, isi, kategori, status) VALUES 
      (?, ?, ?, ?, ?)`,
      [userId, 'Apakah aman minum vitamin C setiap hari?', 'Saya sering merasa lemas, apakah aman jika saya mengonsumsi vitamin C 1000mg setiap hari?', 'Kesehatan Umum', 'terbuka']
    );
    const forumId = forumResult.insertId;

    await db.query(
      `INSERT INTO jawaban_forum (pertanyaan_id, pengguna_id, isi, is_dari_dokter) VALUES 
      (?, ?, ?, ?)`,
      [forumId, dokterId, 'Sebaiknya konsultasikan dulu ke dokter, namun secara umum aman selama tidak memiliki masalah lambung.', true]
    );

    console.log('✅ Seeding data berhasil diselesaikan!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Gagal seeding data:', err.message);
    process.exit(1);
  }
}

seed();
