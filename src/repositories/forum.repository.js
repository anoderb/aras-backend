const db = require('../config/database');

class ForumRepository {
  // Pertanyaan Section
  async findAllPaging(limit, offset, query = {}) {
    let sql = `
      SELECT fp.*, u.nama as nama_penanya, u.foto_profil, u.peran
      FROM forum_pertanyaan fp
      JOIN pengguna u ON fp.pengguna_id = u.id
      WHERE 1=1
    `;
    let countSql = `SELECT COUNT(*) as total FROM forum_pertanyaan WHERE 1=1`;
    let params = [];

    if (query.q) {
      sql += ` AND (fp.judul LIKE ? OR fp.isi LIKE ?)`;
      countSql += ` AND (judul LIKE ? OR isi LIKE ?)`;
      params.push(`%${query.q}%`, `%${query.q}%`);
    }

    if (query.kategori) {
      sql += ` AND fp.kategori = ?`;
      countSql += ` AND kategori = ?`;
      params.push(query.kategori);
    }

    if (query.status) {
      sql += ` AND fp.status = ?`;
      countSql += ` AND status = ?`;
      params.push(query.status);
    }

    sql += ` ORDER BY fp.tgl_dibuat DESC LIMIT ? OFFSET ?`;
    const rowsParams = [...params, limit, offset];

    const [rows] = await db.execute(sql, rowsParams);
    const [[{ total }]] = await db.execute(countSql, params);

    return { data: rows, total };
  }

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT fp.*, u.nama as nama_penanya, u.foto_profil, u.peran
       FROM forum_pertanyaan fp
       JOIN pengguna u ON fp.pengguna_id = u.id
       WHERE fp.id = ?`,
      [id]
    );
    return rows[0];
  }

  async createPertanyaan(data) {
    const { pengguna_id, judul, isi, kategori } = data;
    const [result] = await db.execute(
      `INSERT INTO forum_pertanyaan (pengguna_id, judul, isi, kategori) VALUES (?, ?, ?, ?)`,
      [pengguna_id, judul, isi, kategori]
    );
    return result.insertId;
  }

  async updatePertanyaan(id, penggunaId, data) {
    const { judul, isi, kategori } = data;
    await db.execute(
      'UPDATE forum_pertanyaan SET judul = ?, isi = ?, kategori = ? WHERE id = ? AND pengguna_id = ?',
      [judul, isi, kategori, id, penggunaId]
    );
    return true;
  }

  async deletePertanyaan(id, penggunaId) {
    await db.execute('DELETE FROM forum_pertanyaan WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    return true;
  }

  async updateStatus(id, status) {
    await db.execute('UPDATE forum_pertanyaan SET status = ? WHERE id = ?', [status, id]);
  }

  // Jawaban Section
  async findJawabanByPertanyaan(pertanyaanId) {
    const [rows] = await db.execute(
      `SELECT jf.*, u.nama as nama_penjawab, u.foto_profil, u.peran
       FROM jawaban_forum jf
       JOIN pengguna u ON jf.pengguna_id = u.id
       WHERE jf.pertanyaan_id = ?
       ORDER BY jf.is_jawaban_terbaik DESC, jf.tgl_dibuat ASC`,
      [pertanyaanId]
    );
    return rows;
  }

  async createJawaban(data) {
    const { pertanyaan_id, pengguna_id, isi, is_dari_dokter } = data;
    const [result] = await db.execute(
      `INSERT INTO jawaban_forum (pertanyaan_id, pengguna_id, isi, is_dari_dokter) VALUES (?, ?, ?, ?)`,
      [pertanyaan_id, pengguna_id, isi, is_dari_dokter]
    );
    // Increment counter
    await db.execute('UPDATE forum_pertanyaan SET total_jawaban = total_jawaban + 1 WHERE id = ?', [pertanyaan_id]);
    return result.insertId;
  }

  async deleteJawaban(id, penggunaId) {
    const [row] = await db.execute('SELECT pertanyaan_id FROM jawaban_forum WHERE id = ?', [id]);
    const [res] = await db.execute('DELETE FROM jawaban_forum WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    if (res.affectedRows > 0 && row.length > 0) {
      await db.execute('UPDATE forum_pertanyaan SET total_jawaban = total_jawaban - 1 WHERE id = ?', [row[0].pertanyaan_id]);
    }
    return true;
  }

  async setTerbaik(pertanyaanId, jawabanId) {
    // Reset all terbaik for this pertanyaan
    await db.execute('UPDATE jawaban_forum SET is_jawaban_terbaik = FALSE WHERE pertanyaan_id = ?', [pertanyaanId]);
    // Set this one to terbaik
    await db.execute('UPDATE jawaban_forum SET is_jawaban_terbaik = TRUE WHERE id = ?', [jawabanId]);
    // Set status pertanyaan to terjawab
    await db.execute('UPDATE forum_pertanyaan SET status = "terjawab" WHERE id = ?', [pertanyaanId]);
  }

  async toggleSukaJawaban(penggunaId, jawabanId) {
    const [existing] = await db.execute(
      'SELECT id FROM suka WHERE pengguna_id = ? AND tipe_konten = "jawaban_forum" AND konten_id = ?',
      [penggunaId, jawabanId]
    );

    if (existing.length > 0) {
      await db.execute('DELETE FROM suka WHERE id = ?', [existing[0].id]);
      await db.execute('UPDATE jawaban_forum SET total_suka = total_suka - 1 WHERE id = ?', [jawabanId]);
      return { liked: false };
    } else {
      await db.execute(
        'INSERT INTO suka (pengguna_id, tipe_konten, konten_id) VALUES (?, "jawaban_forum", ?)',
        [penggunaId, jawabanId]
      );
      await db.execute('UPDATE jawaban_forum SET total_suka = total_suka + 1 WHERE id = ?', [jawabanId]);
      return { liked: true };
    }
  }
}

module.exports = new ForumRepository();
