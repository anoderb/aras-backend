const db = require('../config/database');

class DiskusiRepository {
  // Post Section
  async findAllPaging(limit, offset, query = {}) {
    let sql = `
      SELECT p.*, u.nama, u.foto_profil, u.peran
      FROM postingan p
      JOIN pengguna u ON p.pengguna_id = u.id
      WHERE p.status = 'aktif'
    `;
    let countSql = `SELECT COUNT(*) as total FROM postingan WHERE status = 'aktif'`;
    let params = [];

    if (query.kategori) {
      sql += ` AND p.kategori = ?`;
      countSql += ` AND kategori = ?`;
      params.push(query.kategori);
    }

    sql += ` ORDER BY p.is_pinned DESC, p.tgl_dibuat DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    const rowsParams = [...params];

    const [rows] = await db.execute(sql, rowsParams);
    const [[{ total }]] = await db.execute(countSql, params);

    return { data: rows, total };
  }

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT p.*, u.nama, u.foto_profil, u.peran
       FROM postingan p
       JOIN pengguna u ON p.pengguna_id = u.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  async createPost(data) {
    const { pengguna_id, isi, foto, kategori, is_anonim } = data;
    const [result] = await db.execute(
      `INSERT INTO postingan (pengguna_id, isi, foto, kategori, is_anonim) VALUES (?, ?, ?, ?, ?)`,
      [pengguna_id, isi, JSON.stringify(foto), kategori, is_anonim]
    );
    return result.insertId;
  }

  async updatePost(id, penggunaId, data) {
    const { isi, kategori, is_anonim } = data;
    await db.execute(
      'UPDATE postingan SET isi = ?, kategori = ?, is_anonim = ? WHERE id = ? AND pengguna_id = ?',
      [isi, kategori, is_anonim, id, penggunaId]
    );
    return true;
  }

  async updateStatusPost(id, status) {
    await db.execute('UPDATE postingan SET status = ? WHERE id = ?', [status, id]);
  }

  async setPinned(id, isPinned) {
    await db.execute('UPDATE postingan SET is_pinned = ? WHERE id = ?', [isPinned, id]);
  }

  // Komentar Section
  async findKomentarByPost(postinganId) {
    const [rows] = await db.execute(
      `SELECT k.*, u.nama, u.foto_profil, u.peran
       FROM komentar k
       JOIN pengguna u ON k.pengguna_id = u.id
       WHERE k.postingan_id = ? AND k.status = 'aktif'
       ORDER BY k.tgl_dibuat ASC`,
      [postinganId]
    );
    return rows;
  }

  async createKomentar(data) {
    const { postingan_id, pengguna_id, komentar_induk_id, isi, is_anonim, is_koreksi_dokter } = data;
    const [result] = await db.execute(
      `INSERT INTO komentar (postingan_id, pengguna_id, komentar_induk_id, isi, is_anonim, is_koreksi_dokter) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [postingan_id, pengguna_id, komentar_induk_id, isi, is_anonim, is_koreksi_dokter]
    );
    // Increment counter
    await db.execute('UPDATE postingan SET total_komentar = total_komentar + 1 WHERE id = ?', [postingan_id]);
    return result.insertId;
  }

  async deleteKomentar(id, penggunaId) {
    const [row] = await db.execute('SELECT postingan_id FROM komentar WHERE id = ?', [id]);
    const [res] = await db.execute('UPDATE komentar SET status = "dihapus" WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    if (res.affectedRows > 0 && row.length > 0) {
      await db.execute('UPDATE postingan SET total_komentar = total_komentar - 1 WHERE id = ?', [row[0].postingan_id]);
    }
    return true;
  }

  // Suka/Like Section
  async toggleSuka(penggunaId, tipeKonten, kontenId) {
    const [existing] = await db.execute(
      'SELECT id FROM suka WHERE pengguna_id = ? AND tipe_konten = ? AND konten_id = ?',
      [penggunaId, tipeKonten, kontenId]
    );

    if (existing.length > 0) {
      await db.execute('DELETE FROM suka WHERE id = ?', [existing[0].id]);
      const table = tipeKonten === 'postingan' ? 'postingan' : 'komentar';
      await db.execute(`UPDATE ${table} SET total_suka = total_suka - 1 WHERE id = ?`, [kontenId]);
      return { liked: false };
    } else {
      await db.execute(
        'INSERT INTO suka (pengguna_id, tipe_konten, konten_id) VALUES (?, ?, ?)',
        [penggunaId, tipeKonten, kontenId]
      );
      const table = tipeKonten === 'postingan' ? 'postingan' : 'komentar';
      await db.execute(`UPDATE ${table} SET total_suka = total_suka + 1 WHERE id = ?`, [kontenId]);
      return { liked: true };
    }
  }

  // Laporan Section
  async createLaporan(data) {
    const { pelapor_id, tipe_konten, konten_id, alasan, keterangan } = data;
    await db.execute(
      `INSERT INTO laporan_konten (pelapor_id, tipe_konten, konten_id, alasan, keterangan) VALUES (?, ?, ?, ?, ?)`,
      [pelapor_id, tipe_konten, konten_id, alasan, keterangan]
    );
  }

  async findAllLaporan() {
    const [rows] = await db.execute(
      `SELECT l.*, u.nama as nama_pelapor 
       FROM laporan_konten l 
       JOIN pengguna u ON l.pelapor_id = u.id 
       WHERE l.status = 'menunggu' 
       ORDER BY l.tgl_laporan DESC`
    );
    return rows;
  }
}

module.exports = new DiskusiRepository();
