const db = require('../config/database');

class KonsultasiRepository {
  async create(data) {
    const { pengguna_id, dokter_id, jenis, biaya, keluhan } = data;
    const [result] = await db.execute(
      `INSERT INTO konsultasi (pengguna_id, dokter_id, jenis, biaya, keluhan, status) 
       VALUES (?, ?, ?, ?, ?, 'menunggu')`,
      [pengguna_id, dokter_id, jenis, biaya, keluhan]
    );
    return result.insertId;
  }

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT k.*, p.nama as nama_pasien, p.foto_profil as foto_pasien, 
              pd.spesialisasi, u_d.nama as nama_dokter, u_d.foto_profil as foto_dokter
       FROM konsultasi k
       JOIN pengguna p ON k.pengguna_id = p.id
       JOIN profil_dokter pd ON k.dokter_id = pd.id
       JOIN pengguna u_d ON pd.pengguna_id = u_d.id
       WHERE k.id = ?`,
      [id]
    );
    return rows[0];
  }

  async findAllByUser(penggunaId, limit, offset) {
    const [rows] = await db.execute(
      `SELECT k.*, u_d.nama as nama_dokter, pd.spesialisasi, u_d.foto_profil as foto_dokter
       FROM konsultasi k
       JOIN profil_dokter pd ON k.dokter_id = pd.id
       JOIN pengguna u_d ON pd.pengguna_id = u_d.id
       WHERE k.pengguna_id = ?
       ORDER BY k.tgl_dibuat DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`,
      [penggunaId]
    );
    const [[{ total }]] = await db.execute('SELECT COUNT(*) as total FROM konsultasi WHERE pengguna_id = ?', [penggunaId]);
    return { data: rows, total };
  }

  async findAllByDokter(dokterId, limit, offset, status = null) {
    let sql = `
       SELECT k.*, p.nama as nama_pasien, p.foto_profil as foto_pasien
       FROM konsultasi k
       JOIN pengguna p ON k.pengguna_id = p.id
       WHERE k.dokter_id = ?
    `;
    let params = [dokterId];
    
    if (status) {
      sql += ` AND k.status = ?`;
      params.push(status);
    }
    
    sql += ` ORDER BY k.tgl_dibuat DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    const rowsParams = [...params];
    
    const [rows] = await db.execute(sql, rowsParams);
    
    let countSql = 'SELECT COUNT(*) as total FROM konsultasi WHERE dokter_id = ?';
    if (status) countSql += ' AND status = ?';
    const [[{ total }]] = await db.execute(countSql, params);
    
    return { data: rows, total };
  }

  async updateStatus(id, status, extraFields = {}) {
    let updates = ['status = ?'];
    let params = [status];
    
    if (status === 'aktif') {
      updates.push('tgl_mulai = NOW()');
    } else if (status === 'selesai') {
      updates.push('tgl_selesai = NOW()');
    }
    
    for (const [key, value] of Object.entries(extraFields)) {
      updates.push(`${key} = ?`);
      params.push(value);
    }
    
    params.push(id);
    await db.execute(`UPDATE konsultasi SET ${updates.join(', ')} WHERE id = ?`, params);
    return true;
  }

  // Messaging
  async createMessage(data) {
    const { konsultasi_id, pengirim_id, tipe_pengirim, isi_pesan, tipe_pesan, url_file } = data;
    const [result] = await db.execute(
      `INSERT INTO pesan (konsultasi_id, pengirim_id, tipe_pengirim, isi_pesan, tipe_pesan, url_file) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [konsultasi_id, pengirim_id, tipe_pengirim, isi_pesan, tipe_pesan, url_file]
    );
    return result.insertId;
  }

  async findMessagesByKonsultasi(konsultasiId) {
    const [rows] = await db.execute(
      `SELECT * FROM pesan WHERE konsultasi_id = ? ORDER BY tgl_kirim ASC`,
      [konsultasiId]
    );
    return rows;
  }

  async markAsRead(konsultasiId, readerId) {
    await db.execute(
      `UPDATE pesan SET sudah_dibaca = TRUE 
       WHERE konsultasi_id = ? AND pengirim_id != ?`,
      [konsultasiId, readerId]
    );
    return true;
  }

  async deleteMessage(id, pengirimId) {
    await db.execute(`DELETE FROM pesan WHERE id = ? AND pengirim_id = ?`, [id, pengirimId]);
    return true;
  }

  // Rating
  async addRating(data) {
    const { konsultasi_id, pengguna_id, dokter_id, nilai, ulasan } = data;
    await db.execute(
      `INSERT INTO rating_dokter (konsultasi_id, pengguna_id, dokter_id, nilai, ulasan) 
       VALUES (?, ?, ?, ?, ?)`,
      [konsultasi_id, pengguna_id, dokter_id, nilai, ulasan]
    );
    
    // Update Rata-rata Rating di Profil Dokter
    await db.execute(
      `UPDATE profil_dokter pd 
       SET rating = (SELECT AVG(nilai) FROM rating_dokter WHERE dokter_id = pd.id) 
       WHERE id = ?`,
      [dokter_id]
    );
    return true;
  }
}

module.exports = new KonsultasiRepository();
