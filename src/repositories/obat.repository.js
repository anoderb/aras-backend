const db = require('../config/database');

class ObatRepository {
  async tambah(penggunaId, data) {
    const query = `
      INSERT INTO obat_pengguna (pengguna_id, dokter_id, nama_obat, dosis, frekuensi, waktu_minum, tgl_mulai, tgl_selesai, catatan, status_aktif)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      penggunaId,
      data.dokter_id || null,
      data.nama_obat,
      data.dosis || null,
      data.frekuensi || null,
      JSON.stringify(data.waktu_minum),
      data.tgl_mulai,
      data.tgl_selesai || null,
      data.catatan || null,
      data.status_aktif !== undefined ? data.status_aktif : true
    ];
    const [result] = await db.execute(query, values);
    return result.insertId;
  }

  async daftarAktif(penggunaId) {
    const [rows] = await db.execute(
      'SELECT * FROM obat_pengguna WHERE pengguna_id = ? AND status_aktif = 1 ORDER BY tgl_dibuat DESC',
      [penggunaId]
    );
    return rows.map(row => ({
      ...row,
      waktu_minum: typeof row.waktu_minum === 'string' ? JSON.parse(row.waktu_minum) : row.waktu_minum
    }));
  }

  async riwayatPaging(penggunaId, limit, offset) {
    const [rows] = await db.execute(
      'SELECT * FROM obat_pengguna WHERE pengguna_id = ? ORDER BY tgl_dibuat DESC LIMIT ' + parseInt(limit) + ' OFFSET ' + parseInt(offset),
      [penggunaId]
    );
    const [[{ total }]] = await db.execute(
      'SELECT COUNT(*) as total FROM obat_pengguna WHERE pengguna_id = ?',
      [penggunaId]
    );
    return { 
      data: rows.map(row => ({
        ...row,
        waktu_minum: typeof row.waktu_minum === 'string' ? JSON.parse(row.waktu_minum) : row.waktu_minum
      })), 
      total 
    };
  }

  async findDetail(id, penggunaId) {
    const [rows] = await db.execute(
      'SELECT * FROM obat_pengguna WHERE id = ? AND pengguna_id = ?',
      [id, penggunaId]
    );
    if (!rows[0]) return null;
    return {
      ...rows[0],
      waktu_minum: typeof rows[0].waktu_minum === 'string' ? JSON.parse(rows[0].waktu_minum) : rows[0].waktu_minum
    };
  }

  async update(id, penggunaId, data) {
    const allowedFields = ['nama_obat', 'dokter_id', 'dosis', 'frekuensi', 'waktu_minum', 'tgl_mulai', 'tgl_selesai', 'catatan', 'status_aktif'];
    let updates = [];
    let values = [];

    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updates.push(`${key} = ?`);
        if (key === 'waktu_minum') {
          values.push(JSON.stringify(data[key]));
        } else {
          values.push(data[key]);
        }
      }
    }

    if (updates.length === 0) return true;

    values.push(id, penggunaId);
    const query = `UPDATE obat_pengguna SET ${updates.join(', ')} WHERE id = ? AND pengguna_id = ?`;
    await db.execute(query, values);
    return true;
  }

  async hapus(id, penggunaId) {
    await db.execute('DELETE FROM obat_pengguna WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    return true;
  }

  async nonaktifkan(id, penggunaId) {
    await db.execute('UPDATE obat_pengguna SET status_aktif = 0 WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    return true;
  }

  async logMinum(penggunaId, obatId, data) {
    const query = `
      INSERT INTO log_minum_obat (obat_pengguna_id, pengguna_id, jadwal_minum, waktu_diminum, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      obatId,
      penggunaId,
      data.jadwal_minum,
      data.waktu_diminum || null,
      data.status
    ];
    await db.execute(query, values);
    return true;
  }

  async statistikKepatuhan(obatId, penggunaId) {
    const [rows] = await db.execute(
      `SELECT status, COUNT(*) as jumlah 
       FROM log_minum_obat 
       WHERE obat_pengguna_id = ? AND pengguna_id = ? 
       GROUP BY status`,
      [obatId, penggunaId]
    );
    return rows;
  }
}

module.exports = new ObatRepository();
