const db = require('../config/database');

class DokterRepository {
  async findAllPaging(limit, offset, query = {}) {
    let sql = `
      SELECT p.id, p.nama, p.email, p.foto_profil, pd.* 
      FROM profil_dokter pd
      JOIN pengguna p ON pd.pengguna_id = p.id
      WHERE pd.status_verifikasi = 'terverifikasi'
    `;
    let countSql = `
      SELECT COUNT(*) as total 
      FROM profil_dokter pd
      WHERE pd.status_verifikasi = 'terverifikasi'
    `;
    let params = [];

    if (query.q) {
      sql += ` AND (p.nama LIKE ? OR pd.spesialisasi LIKE ?)`;
      countSql += ` AND (pd.spesialisasi LIKE ? OR pd.bio LIKE ?)`; // Simplified for search
      params.push(`%${query.q}%`, `%${query.q}%`);
    }

    if (query.spesialisasi) {
      sql += ` AND pd.spesialisasi = ?`;
      countSql += ` AND pd.spesialisasi = ?`;
      params.push(query.spesialisasi);
    }

    sql += ` ORDER BY pd.rating DESC, pd.total_konsultasi DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    const rowsParams = [...params];

    const [rows] = await db.execute(sql, rowsParams);
    const [[{ total }]] = await db.execute(countSql, params.length > 2 ? params.slice(0, 2) : params);

    return { data: rows, total };
  }

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT p.id as pengguna_id, p.nama, p.email, p.foto_profil, pd.* 
       FROM profil_dokter pd
       JOIN pengguna p ON pd.pengguna_id = p.id
       WHERE pd.id = ?`,
      [id]
    );
    return rows[0];
  }

  async findByPenggunaId(penggunaId) {
    const [rows] = await db.execute(
      `SELECT * FROM profil_dokter WHERE pengguna_id = ?`,
      [penggunaId]
    );
    return rows[0];
  }

  async updateProfil(penggunaId, data) {
    const allowedFields = [
      'no_str', 'no_sip', 'spesialisasi', 'pendidikan', 
      'pengalaman_tahun', 'bio', 'biaya_konsultasi', 
      'lokasi_praktik', 'jam_praktik'
    ];
    let updates = [];
    let values = [];

    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updates.push(`${key} = ?`);
        if (key === 'jam_praktik') {
          values.push(JSON.stringify(data[key]));
        } else {
          values.push(data[key]);
        }
      }
    }

    if (updates.length === 0) return true;

    values.push(penggunaId);
    const query = `UPDATE profil_dokter SET ${updates.join(', ')} WHERE pengguna_id = ?`;
    await db.execute(query, values);
    return true;
  }

  async setOnlineStatus(penggunaId, status) {
    await db.execute('UPDATE profil_dokter SET status_online = ? WHERE pengguna_id = ?', [status, penggunaId]);
    return true;
  }

  async getSpesialisasi() {
    const [rows] = await db.execute('SELECT DISTINCT spesialisasi FROM profil_dokter WHERE status_verifikasi = "terverifikasi" AND spesialisasi IS NOT NULL');
    return rows.map(r => r.spesialisasi);
  }

  // Admin section
  async getAntrianVerifikasi() {
    const [rows] = await db.execute(
      `SELECT p.nama, p.email, pd.* 
       FROM profil_dokter pd
       JOIN pengguna p ON pd.pengguna_id = p.id
       WHERE pd.status_verifikasi = 'menunggu'`
    );
    return rows;
  }

  async verifikasi(id, adminId, status) {
    await db.execute(
      'UPDATE profil_dokter SET status_verifikasi = ?, tgl_verifikasi = NOW(), diverifikasi_oleh = ? WHERE id = ?',
      [status, adminId, id]
    );
    return true;
  }

  async getStatistik(penggunaId) {
    const [rows] = await db.execute(
      'SELECT total_konsultasi, rating as rata_rating FROM profil_dokter WHERE pengguna_id = ?',
      [penggunaId]
    );
    return rows[0];
  }
}

module.exports = new DokterRepository();
