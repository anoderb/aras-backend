const db = require('../config/database');

class SecondOpinionRepository {
  async create(data) {
    const { pengguna_id, dokter_id, diagnosis_awal, dokumen_medis, pertanyaan, biaya } = data;
    const [result] = await db.execute(
      `INSERT INTO second_opinion (pengguna_id, dokter_id, diagnosis_awal, dokumen_medis, pertanyaan, biaya, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'menunggu')`,
      [pengguna_id, dokter_id, diagnosis_awal, JSON.stringify(dokumen_medis), pertanyaan, biaya]
    );
    return result.insertId;
  }

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT so.*, p.nama as nama_pasien, p.foto_profil as foto_pasien,
              u_d.nama as nama_dokter, pd.spesialisasi
       FROM second_opinion so
       JOIN pengguna p ON so.pengguna_id = p.id
       JOIN profil_dokter pd ON so.dokter_id = pd.id
       JOIN pengguna u_d ON pd.pengguna_id = u_d.id
       WHERE so.id = ?`,
      [id]
    );
    return rows[0];
  }

  async findAllByUser(penggunaId) {
    const [rows] = await db.execute(
      `SELECT so.*, u_d.nama as nama_dokter, pd.spesialisasi
       FROM second_opinion so
       JOIN profil_dokter pd ON so.dokter_id = pd.id
       JOIN pengguna u_d ON pd.pengguna_id = u_d.id
       WHERE so.pengguna_id = ?
       ORDER BY so.tgl_dibuat DESC`,
      [penggunaId]
    );
    return rows;
  }

  async findAllByDokter(dokterId) {
    const [rows] = await db.execute(
      `SELECT so.*, p.nama as nama_pasien
       FROM second_opinion so
       JOIN pengguna p ON so.pengguna_id = p.id
       WHERE so.dokter_id = ?
       ORDER BY so.tgl_dibuat DESC`,
      [dokterId]
    );
    return rows;
  }

  async updatePendapat(id, pendapat) {
    await db.execute(
      `UPDATE second_opinion SET pendapat_dokter = ?, status = 'selesai', tgl_selesai = NOW() WHERE id = ?`,
      [pendapat, id]
    );
    return true;
  }

  async updateStatus(id, status) {
    await db.execute(`UPDATE second_opinion SET status = ? WHERE id = ?`, [status, id]);
    return true;
  }
}

module.exports = new SecondOpinionRepository();
