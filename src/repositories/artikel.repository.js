const db = require('../config/database');

class ArtikelRepository {
  async findAllPaging(limit, offset, query = {}) {
    let sql = `
      SELECT a.*, u.nama as nama_penulis, p.spesialisasi
      FROM artikel a
      JOIN profil_dokter p ON a.dokter_id = p.id
      JOIN pengguna u ON p.pengguna_id = u.id
      WHERE a.status = 'diterbitkan'
    `;
    let countSql = `SELECT COUNT(*) as total FROM artikel WHERE status = 'diterbitkan'`;
    let params = [];

    if (query.q) {
      sql += ` AND (a.judul LIKE ? OR a.ringkasan LIKE ?)`;
      countSql += ` AND (judul LIKE ? OR ringkasan LIKE ?)`;
      params.push(`%${query.q}%`, `%${query.q}%`);
    }

    if (query.kategori) {
      sql += ` AND a.kategori = ?`;
      countSql += ` AND kategori = ?`;
      params.push(query.kategori);
    }

    sql += ` ORDER BY a.tgl_terbit DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    const rowsParams = [...params];

    const [rows] = await db.execute(sql, rowsParams);
    const [[{ total }]] = await db.execute(countSql, params);

    return { data: rows, total };
  }

  async findPopuler(limit) {
    const [rows] = await db.execute(
      `SELECT a.*, u.nama as nama_penulis, p.spesialisasi
       FROM artikel a
       JOIN profil_dokter p ON a.dokter_id = p.id
       JOIN pengguna u ON p.pengguna_id = u.id
       WHERE a.status = 'diterbitkan'
       ORDER BY a.total_dibaca DESC LIMIT ${limit}`
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT a.*, u.nama as nama_penulis, p.spesialisasi, u.foto_profil as foto_penulis
       FROM artikel a
       JOIN profil_dokter p ON a.dokter_id = p.id
       JOIN pengguna u ON p.pengguna_id = u.id
       WHERE a.id = ?`,
      [id]
    );
    return rows[0];
  }

  async incrementViews(id) {
    await db.execute('UPDATE artikel SET total_dibaca = total_dibaca + 1 WHERE id = ?', [id]);
  }

  // Dokter Section
  async create(data) {
    const { dokter_id, judul, isi, ringkasan, kategori, thumbnail, status } = data;
    const tgl_terbit = status === 'diterbitkan' ? new Date() : null;
    const [result] = await db.execute(
      `INSERT INTO artikel (dokter_id, judul, isi, ringkasan, kategori, thumbnail, status, tgl_terbit) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [dokter_id, judul, isi, ringkasan, kategori, thumbnail, status, tgl_terbit]
    );
    return result.insertId;
  }

  async update(id, dokterId, data) {
    let updates = [];
    let params = [];
    
    for (const [key, value] of Object.entries(data)) {
      updates.push(`${key} = ?`);
      params.push(value);
      if (key === 'status' && value === 'diterbitkan') {
        updates.push('tgl_terbit = ?');
        params.push(new Date());
      }
    }
    
    params.push(id, dokterId);
    await db.execute(`UPDATE artikel SET ${updates.join(', ')} WHERE id = ? AND dokter_id = ?`, params);
    return true;
  }

  async delete(id, dokterId) {
    await db.execute('DELETE FROM artikel WHERE id = ? AND dokter_id = ?', [id, dokterId]);
    return true;
  }

  async findByDokter(dokterId) {
    const [rows] = await db.execute('SELECT * FROM artikel WHERE dokter_id = ? ORDER BY tgl_update DESC', [dokterId]);
    return rows;
  }

  // Bookmark section
  async bookmark(penggunaId, artikelId) {
    await db.execute('INSERT IGNORE INTO simpan_artikel (pengguna_id, artikel_id) VALUES (?, ?)', [penggunaId, artikelId]);
    await db.execute('UPDATE artikel SET total_disimpan = total_disimpan + 1 WHERE id = ?', [artikelId]);
  }

  async unbookmark(penggunaId, artikelId) {
    const [res] = await db.execute('DELETE FROM simpan_artikel WHERE pengguna_id = ? AND artikel_id = ?', [penggunaId, artikelId]);
    if (res.affectedRows > 0) {
      await db.execute('UPDATE artikel SET total_disimpan = total_disimpan - 1 WHERE id = ?', [artikelId]);
    }
  }

  async findSaved(penggunaId) {
    const [rows] = await db.execute(
      `SELECT a.*, u.nama as nama_penulis, p.spesialisasi
       FROM simpan_artikel sa
       JOIN artikel a ON sa.artikel_id = a.id
       JOIN profil_dokter p ON a.dokter_id = p.id
       JOIN pengguna u ON p.pengguna_id = u.id
       WHERE sa.pengguna_id = ?
       ORDER BY sa.tgl_disimpan DESC`,
      [penggunaId]
    );
    return rows;
  }
}

module.exports = new ArtikelRepository();
