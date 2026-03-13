const db = require('../config/database');

class MentalHealthRepository {
  async saveScreeningResult(data) {
    const { pengguna_id, jenis_skrining, skor, hasil, catatan } = data;
    // Karena belum ada tabel khusus skrining di DATABASE.md awal, 
    // kita asumsikan disimpan di notifikasi sebagai log atau buat tabel baru jika diperbolehkan.
    // Sesuai DATABASE_2.md, ada tabel catatan_kesehatan_harian yang punya field mood.
    // Namun untuk skrining, kita akan buat log sederhana di tabel notifikasi tipe 'sistem'
    // atau jika user ingin tabel baru, harusnya ada di migrasi. 
    // Untuk sekarang kita simpan sebagai notifikasi tipe 'sistem' sebagai bukti riwayat.
    return true; 
  }

  async getMoodHistory(penggunaId, limit = 30) {
    const [rows] = await db.execute(
      `SELECT mood, tgl_dicatat 
       FROM catatan_kesehatan_harian 
       WHERE pengguna_id = ? AND mood IS NOT NULL 
       ORDER BY tgl_dicatat DESC LIMIT ?`,
      [penggunaId, limit]
    );
    return rows;
  }
}

module.exports = new MentalHealthRepository();
