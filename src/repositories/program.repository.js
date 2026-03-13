const db = require('../config/database');

class ProgramRepository {
  // Program Kesehatan
  async createProgram(data) {
    const { dokter_id, pengguna_id, judul, deskripsi, durasi_hari, kategori, tgl_mulai, tgl_selesai } = data;
    const [result] = await db.execute(
      `INSERT INTO program_kesehatan (dokter_id, pengguna_id, judul, deskripsi, durasi_hari, kategori, tgl_mulai, tgl_selesai, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'aktif')`,
      [dokter_id, pengguna_id, judul, deskripsi, durasi_hari, kategori, tgl_mulai, tgl_selesai]
    );
    return result.insertId;
  }

  async findProgramById(id) {
    const [rows] = await db.execute(
      `SELECT pk.*, u_d.nama as nama_dokter, pd.spesialisasi
       FROM program_kesehatan pk
       JOIN profil_dokter pd ON pk.dokter_id = pd.id
       JOIN pengguna u_d ON pd.pengguna_id = u_d.id
       WHERE pk.id = ?`,
      [id]
    );
    return rows[0];
  }

  async findAllProgramsByUser(penggunaId) {
    const [rows] = await db.execute(
      `SELECT pk.*, u_d.nama as nama_dokter, pd.spesialisasi
       FROM program_kesehatan pk
       JOIN profil_dokter pd ON pk.dokter_id = pd.id
       JOIN pengguna u_d ON pd.pengguna_id = u_d.id
       WHERE pk.pengguna_id = ?
       ORDER BY pk.tgl_dibuat DESC`,
      [penggunaId]
    );
    return rows;
  }

  async findAllProgramsByDokter(dokterId) {
    const [rows] = await db.execute(
      `SELECT pk.*, p.nama as nama_pasien, p.foto_profil as foto_pasien
       FROM program_kesehatan pk
       JOIN pengguna p ON pk.pengguna_id = p.id
       WHERE pk.dokter_id = ?
       ORDER BY pk.tgl_dibuat DESC`,
      [dokterId]
    );
    return rows;
  }

  // Tugas Program
  async createTugas(data) {
    const { program_id, hari_ke, judul_tugas, deskripsi, tipe, target_nilai } = data;
    const [result] = await db.execute(
      `INSERT INTO tugas_program (program_id, hari_ke, judul_tugas, deskripsi, tipe, target_nilai) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [program_id, hari_ke, judul_tugas, deskripsi, tipe, target_nilai]
    );
    return result.insertId;
  }

  async findTugasByProgramId(programId) {
    const [rows] = await db.execute(
      `SELECT tp.*, pt.status, pt.nilai_aktual, pt.catatan, pt.tgl_selesai
       FROM tugas_program tp
       LEFT JOIN progres_tugas pt ON tp.id = pt.tugas_id
       WHERE tp.program_id = ?
       ORDER BY tp.hari_ke ASC`,
      [programId]
    );
    return rows;
  }

  async findTugasHariIni(programId, hariKe) {
    const [rows] = await db.execute(
      `SELECT tp.*, pt.status, pt.nilai_aktual, pt.catatan, pt.tgl_selesai
       FROM tugas_program tp
       LEFT JOIN progres_tugas pt ON tp.id = pt.tugas_id
       WHERE tp.program_id = ? AND tp.hari_ke = ?`,
      [programId, hariKe]
    );
    return rows;
  }

  // Progres Tugas
  async updateProgres(tugasId, penggunaId, data) {
    const { status, nilai_aktual, catatan } = data;
    // Cek apakah sudah ada progres
    const [existing] = await db.execute(
      'SELECT id FROM progres_tugas WHERE tugas_id = ? AND pengguna_id = ?',
      [tugasId, penggunaId]
    );

    if (existing.length > 0) {
      await db.execute(
        `UPDATE progres_tugas SET status = ?, nilai_aktual = ?, catatan = ?, tgl_selesai = ? 
         WHERE tugas_id = ? AND pengguna_id = ?`,
        [status, nilai_aktual, catatan, status === 'selesai' ? new Date() : null, tugasId, penggunaId]
      );
    } else {
      await db.execute(
        `INSERT INTO progres_tugas (tugas_id, pengguna_id, status, nilai_aktual, catatan, tgl_selesai) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [tugasId, penggunaId, status, nilai_aktual, catatan, status === 'selesai' ? new Date() : null]
      );
    }
    return true;
  }

  async getProgresStatistik(programId) {
    const [[{ total_tugas }]] = await db.execute(
      'SELECT COUNT(*) as total_tugas FROM tugas_program WHERE program_id = ?',
      [programId]
    );
    const [[{ tugas_selesai }]] = await db.execute(
      `SELECT COUNT(*) as tugas_selesai 
       FROM progres_tugas pt
       JOIN tugas_program tp ON pt.tugas_id = tp.id
       WHERE tp.program_id = ? AND pt.status = 'selesai'`,
      [programId]
    );
    return { total_tugas, tugas_selesai };
  }
}

module.exports = new ProgramRepository();
