const db = require('../config/database');

class JanjiTemuRepository {
  async create(data) {
    const { pengguna_id, dokter_id, tgl_jadwal, jenis, lokasi, keluhan, catatan } = data;
    const [result] = await db.execute(
      `INSERT INTO janji_temu (pengguna_id, dokter_id, tgl_jadwal, jenis, lokasi, keluhan, catatan, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'menunggu')`,
      [pengguna_id, dokter_id, tgl_jadwal, jenis, lokasi, keluhan, catatan]
    );
    return result.insertId;
  }

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT jt.*, p.nama as nama_pasien, p.foto_profil as foto_pasien, 
              pd.spesialisasi, u_d.nama as nama_dokter, u_d.foto_profil as foto_dokter
       FROM janji_temu jt
       JOIN pengguna p ON jt.pengguna_id = p.id
       JOIN profil_dokter pd ON jt.dokter_id = pd.id
       JOIN pengguna u_d ON pd.pengguna_id = u_d.id
       WHERE jt.id = ?`,
      [id]
    );
    return rows[0];
  }

  async findAllByUser(penggunaId, limit, offset) {
    const [rows] = await db.execute(
      `SELECT jt.*, u_d.nama as nama_dokter, pd.spesialisasi, u_d.foto_profil as foto_dokter
       FROM janji_temu jt
       JOIN profil_dokter pd ON jt.dokter_id = pd.id
       JOIN pengguna u_d ON pd.pengguna_id = u_d.id
       WHERE jt.pengguna_id = ?
       ORDER BY jt.tgl_jadwal DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`,
      [penggunaId]
    );
    const [[{ total }]] = await db.execute('SELECT COUNT(*) as total FROM janji_temu WHERE pengguna_id = ?', [penggunaId]);
    return { data: rows, total };
  }

  async findAllByDokter(dokterId, limit, offset) {
    const [rows] = await db.execute(
      `SELECT jt.*, p.nama as nama_pasien, p.foto_profil as foto_pasien
       FROM janji_temu jt
       JOIN pengguna p ON jt.pengguna_id = p.id
       WHERE jt.dokter_id = ?
       ORDER BY jt.tgl_jadwal DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`,
      [dokterId]
    );
    const [[{ total }]] = await db.execute('SELECT COUNT(*) as total FROM janji_temu WHERE dokter_id = ?', [dokterId]);
    return { data: rows, total };
  }

  async updateStatus(id, status, extraFields = {}) {
    let updates = ['status = ?'];
    let params = [status];
    
    for (const [key, value] of Object.entries(extraFields)) {
      updates.push(`${key} = ?`);
      params.push(value);
    }
    
    params.push(id);
    await db.execute(`UPDATE janji_temu SET ${updates.join(', ')} WHERE id = ?`, params);
    return true;
  }

  async reschedule(id, tglJadwal, catatan) {
    await db.execute(
      `UPDATE janji_temu SET tgl_jadwal = ?, catatan = ?, status = 'menunggu' WHERE id = ?`,
      [tglJadwal, catatan, id]
    );
    return true;
  }
}

module.exports = new JanjiTemuRepository();
