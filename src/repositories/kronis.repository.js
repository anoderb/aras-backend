const db = require('../config/database');

class KronisRepository {
  async getVitalTrends(penggunaId, limit = 20) {
    const [rows] = await db.execute(
      `SELECT tgl_dicatat, berat_badan, tekanan_darah_sistolik, tekanan_darah_diastolik, gula_darah, detak_jantung
       FROM catatan_kesehatan_harian
       WHERE pengguna_id = ?
       ORDER BY tgl_dicatat DESC LIMIT ${parseInt(limit)}`,
      [penggunaId]
    );
    return rows;
  }

  async findLatestUnbalanced(penggunaId) {
    // Cari data terakhir yang di luar batas normal (mock threshold)
    const [rows] = await db.execute(
      `SELECT * FROM catatan_kesehatan_harian
       WHERE pengguna_id = ? 
       AND (gula_darah > 200 OR tekanan_darah_sistolik > 140 OR detak_jantung > 100)
       ORDER BY tgl_dicatat DESC LIMIT 5`,
      [penggunaId]
    );
    return rows;
  }
}

module.exports = new KronisRepository();
