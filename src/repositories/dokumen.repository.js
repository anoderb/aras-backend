const db = require('../config/database');

class DokumenRepository {
  async tambah(penggunaId, data) {
    const query = `
      INSERT INTO dokumen_medis (pengguna_id, judul, jenis, url_file, nilai_abnormal, ringkasan, tgl_dokumen)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      penggunaId,
      data.judul,
      data.jenis,
      data.url_file || null,
      data.nilai_abnormal || false,
      data.ringkasan || null,
      data.tgl_dokumen
    ];
    const [result] = await db.execute(query, values);
    return result.insertId;
  }

  async daftarPaging(penggunaId, filter = {}, limit, offset) {
    let query = 'SELECT * FROM dokumen_medis WHERE pengguna_id = ?';
    let countQuery = 'SELECT COUNT(*) as total FROM dokumen_medis WHERE pengguna_id = ?';
    let params = [penggunaId];

    if (filter.jenis) {
      query += ' AND jenis = ?';
      countQuery += ' AND jenis = ?';
      params.push(filter.jenis);
    }

    query += ' ORDER BY tgl_dokumen DESC LIMIT ? OFFSET ?';
    const rowParams = [...params, limit, offset];

    const [rows] = await db.execute(query, rowParams);
    const [[{ total }]] = await db.execute(countQuery, params);

    return { data: rows, total };
  }

  async findDetail(id, penggunaId) {
    const [rows] = await db.execute(
      'SELECT * FROM dokumen_medis WHERE id = ? AND pengguna_id = ?',
      [id, penggunaId]
    );
    return rows[0];
  }

  async update(id, penggunaId, data) {
    const allowedFields = ['judul', 'jenis', 'url_file', 'nilai_abnormal', 'ringkasan', 'tgl_dokumen'];
    let updates = [];
    let values = [];

    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(data[key]);
      }
    }

    if (updates.length === 0) return true;

    values.push(id, penggunaId);
    const query = `UPDATE dokumen_medis SET ${updates.join(', ')} WHERE id = ? AND pengguna_id = ?`;
    await db.execute(query, values);
    return true;
  }

  async hapus(id, penggunaId) {
    await db.execute('DELETE FROM dokumen_medis WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    return true;
  }
}

module.exports = new DokumenRepository();
