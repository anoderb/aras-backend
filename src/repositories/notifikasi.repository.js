const db = require('../config/database');

class NotifikasiRepository {
  async findAllByPengguna(penggunaId, limit = 50) {
    const [rows] = await db.execute(
      `SELECT * FROM notifikasi 
       WHERE pengguna_id = ? 
       ORDER BY tgl_dibuat DESC LIMIT ${parseInt(limit)}`,
      [penggunaId]
    );
    return rows;
  }

  async countUnread(penggunaId) {
    const [[{ total }]] = await db.execute(
      'SELECT COUNT(*) as total FROM notifikasi WHERE pengguna_id = ? AND sudah_dibaca = FALSE',
      [penggunaId]
    );
    return total;
  }

  async markAsRead(id, penggunaId) {
    await db.execute(
      'UPDATE notifikasi SET sudah_dibaca = TRUE WHERE id = ? AND pengguna_id = ?',
      [id, penggunaId]
    );
    return true;
  }

  async markAllAsRead(penggunaId) {
    await db.execute(
      'UPDATE notifikasi SET sudah_dibaca = TRUE WHERE pengguna_id = ?',
      [penggunaId]
    );
    return true;
  }

  async delete(id, penggunaId) {
    await db.execute(
      'DELETE FROM notifikasi WHERE id = ? AND pengguna_id = ?',
      [id, penggunaId]
    );
    return true;
  }

  async create(data) {
    const { pengguna_id, judul, pesan, tipe, referensi_tipe, referensi_id } = data;
    await db.execute(
      `INSERT INTO notifikasi (pengguna_id, judul, pesan, tipe, referensi_tipe, referensi_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [pengguna_id, judul, pesan, tipe, referensi_tipe, referensi_id]
    );
    return true;
  }
}

module.exports = new NotifikasiRepository();
