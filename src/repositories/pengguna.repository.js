const db = require('../config/database');

class PenggunaRepository {
  async cariBerdasarkanId(id) {
    const [rows] = await db.execute(
      `SELECT id, nama, email, no_telepon, peran, langganan, foto_profil, 
              tgl_lahir, jenis_kelamin, golongan_darah, alergi, kondisi_kronis, 
              kontak_darurat_nama, kontak_darurat_telepon, status_aktif, tgl_daftar 
       FROM pengguna WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async cariSandiBerdasarkanId(id) {
    const [rows] = await db.execute('SELECT kata_sandi FROM pengguna WHERE id = ?', [id]);
    return rows[0];
  }

  async perbaruiProfil(id, data) {
    const allowedFields = [
      'nama', 'no_telepon', 'tgl_lahir', 'jenis_kelamin', 
      'golongan_darah', 'alergi', 'kondisi_kronis', 
      'kontak_darurat_nama', 'kontak_darurat_telepon'
    ];
    
    let updates = [];
    let values = [];
    
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    
    if (updates.length === 0) return true;
    
    values.push(id);
    const query = `UPDATE pengguna SET ${updates.join(', ')} WHERE id = ?`;
    await db.execute(query, values);
    return true;
  }

  async perbaruiFotoProfil(id, url) {
    await db.execute('UPDATE pengguna SET foto_profil = ? WHERE id = ?', [url, id]);
    return true;
  }

  async perbaruiSandi(id, hashedSandi) {
    await db.execute('UPDATE pengguna SET kata_sandi = ? WHERE id = ?', [hashedSandi, id]);
    return true;
  }

  async hapusAkun(id) {
    await db.execute('UPDATE pengguna SET status_aktif = FALSE WHERE id = ?', [id]);
    return true;
  }

  async ambilDataDashboard(id) {
    // Return basic health data & total family members
    const [[{ total_keluarga }]] = await db.execute('SELECT COUNT(*) as total_keluarga FROM anggota_keluarga WHERE pemilik_id = ?', [id]);
    
    return {
      keluarga_terdaftar: total_keluarga
    };
  }

  async ambilStatistik(id) {
    // Return latest health records
    const [catatan] = await db.execute(
      'SELECT berat_badan, tekanan_darah_sistolik, tekanan_darah_diastolik, gula_darah, tgl_dicatat FROM catatan_kesehatan_harian WHERE pengguna_id = ? ORDER BY tgl_dicatat DESC LIMIT 7',
      [id]
    );
    return {
      kesehatan_terakhir: catatan
    };
  }
}

module.exports = new PenggunaRepository();
