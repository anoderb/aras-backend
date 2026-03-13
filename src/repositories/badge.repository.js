const db = require('../config/database');

class BadgeRepository {
  async findAllByPengguna(penggunaId) {
    const [rows] = await db.execute(
      'SELECT * FROM badge_pengguna WHERE pengguna_id = ? ORDER BY tgl_diperoleh DESC',
      [penggunaId]
    );
    return rows;
  }

  async findAvailable() {
    // Di masa depan mungkin ada tabel badge_master, sementara return statis atau filter dari tabel yang ada
    // Sesuai DATABASE_2.md, ada endpoint /badge/tersedia
    const [rows] = await db.execute(
      'SELECT DISTINCT kode_badge, nama_badge, deskripsi, ikon FROM badge_pengguna'
    );
    return rows;
  }

  async findByPenggunaId(penggunaId) {
    const [rows] = await db.execute(
      'SELECT * FROM badge_pengguna WHERE pengguna_id = ?',
      [penggunaId]
    );
    return rows;
  }

  async giveBadge(penggunaId, badgeData) {
    const { kode_badge, nama_badge, deskripsi, ikon } = badgeData;
    await db.execute(
      `INSERT IGNORE INTO badge_pengguna (pengguna_id, kode_badge, nama_badge, deskripsi, ikon) 
       VALUES (?, ?, ?, ?, ?)`,
      [penggunaId, kode_badge, nama_badge, deskripsi, ikon]
    );
    return true;
  }
}

module.exports = new BadgeRepository();
