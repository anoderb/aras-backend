const db = require('../config/database');

class KeluargaRepository {
  async getKeluarga(pemilikId) {
    const [rows] = await db.execute(
      `SELECT ak.id as relasi_id, ak.hubungan, ak.tgl_ditambahkan, 
              p.id as pengguna_id, p.nama, p.email, p.jenis_kelamin, p.tgl_lahir, p.golongan_darah, p.foto_profil 
       FROM anggota_keluarga ak 
       JOIN pengguna p ON ak.anggota_id = p.id 
       WHERE ak.pemilik_id = ?`,
      [pemilikId]
    );
    return rows;
  }

  async findDetail(relasiId, pemilikId) {
    const [rows] = await db.execute(
      `SELECT ak.id as relasi_id, ak.hubungan, ak.tgl_ditambahkan, ak.anggota_id,
              p.nama, p.email, p.jenis_kelamin, p.tgl_lahir, p.golongan_darah, p.foto_profil, p.kondisi_kronis, p.alergi 
       FROM anggota_keluarga ak 
       JOIN pengguna p ON ak.anggota_id = p.id 
       WHERE ak.id = ? AND ak.pemilik_id = ?`,
      [relasiId, pemilikId]
    );
    return rows[0];
  }

  async checkRelasiExists(pemilikId, anggotaId) {
    const [rows] = await db.execute('SELECT id FROM anggota_keluarga WHERE pemilik_id = ? AND anggota_id = ?', [pemilikId, anggotaId]);
    return rows.length > 0;
  }

  async tambahAnggota(pemilikId, anggotaId, hubungan) {
    const [result] = await db.execute(
      'INSERT INTO anggota_keluarga (pemilik_id, anggota_id, hubungan) VALUES (?, ?, ?)',
      [pemilikId, anggotaId, hubungan]
    );
    return result.insertId;
  }

  async updateHubungan(relasiId, hubungan) {
    await db.execute('UPDATE anggota_keluarga SET hubungan = ? WHERE id = ?', [hubungan, relasiId]);
    return true;
  }

  async hapusAnggota(relasiId) {
    await db.execute('DELETE FROM anggota_keluarga WHERE id = ?', [relasiId]);
    return true;
  }
}

module.exports = new KeluargaRepository();
