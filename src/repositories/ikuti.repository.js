const db = require('../config/database');

class IkutiRepository {
  async follow(pengikutId, diikutiId) {
    await db.execute(
      'INSERT IGNORE INTO mengikuti (pengikut_id, diikuti_id) VALUES (?, ?)',
      [pengikutId, diikutiId]
    );
    return true;
  }

  async unfollow(pengikutId, diikutiId) {
    await db.execute(
      'DELETE FROM mengikuti WHERE pengikut_id = ? AND diikuti_id = ?',
      [pengikutId, diikutiId]
    );
    return true;
  }

  async findFollowers(penggunaId) {
    const [rows] = await db.execute(
      `SELECT m.tgl_mengikuti, u.id, u.nama, u.foto_profil, u.peran
       FROM mengikuti m
       JOIN pengguna u ON m.pengikut_id = u.id
       WHERE m.diikuti_id = ?
       ORDER BY m.tgl_mengikuti DESC`,
      [penggunaId]
    );
    return rows;
  }

  async findFollowing(penggunaId) {
    const [rows] = await db.execute(
      `SELECT m.tgl_mengikuti, u.id, u.nama, u.foto_profil, u.peran
       FROM mengikuti m
       JOIN pengguna u ON m.diikuti_id = u.id
       WHERE m.pengikut_id = ?
       ORDER BY m.tgl_mengikuti DESC`,
      [penggunaId]
    );
    return rows;
  }

  async checkStatus(pengikutId, diikutiId) {
    const [rows] = await db.execute(
      'SELECT id FROM mengikuti WHERE pengikut_id = ? AND diikuti_id = ?',
      [pengikutId, diikutiId]
    );
    return rows.length > 0;
  }
}

module.exports = new IkutiRepository();
