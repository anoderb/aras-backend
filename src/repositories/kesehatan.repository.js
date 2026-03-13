const db = require('../config/database');

class KesehatanRepository {
  async tambah(penggunaId, data) {
    const fields = ['pengguna_id'];
    const values = [penggunaId];
    const placeholders = ['?'];

    const allowedFields = [
      'berat_badan', 'tinggi_badan', 'tekanan_darah_sistolik', 'tekanan_darah_diastolik',
      'gula_darah', 'detak_jantung', 'suhu_tubuh', 'langkah_kaki', 'mood', 'catatan'
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined && data[field] !== null) {
        fields.push(field);
        values.push(data[field]);
        placeholders.push('?');
      }
    }

    const query = `INSERT INTO catatan_kesehatan_harian (${fields.join(', ')}) VALUES (${placeholders.join(', ')})`;
    const [result] = await db.execute(query, values);
    return result.insertId;
  }

  async riwayatPaging(penggunaId, limit, offset) {
    const [rows] = await db.execute(
      `SELECT * FROM catatan_kesehatan_harian WHERE pengguna_id = ? ORDER BY tgl_dicatat DESC LIMIT ? OFFSET ?`,
      [penggunaId, limit, offset]
    );
    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM catatan_kesehatan_harian WHERE pengguna_id = ?`,
      [penggunaId]
    );
    return { data: rows, total };
  }

  async findDetail(id, penggunaId) {
    const [rows] = await db.execute(
      'SELECT * FROM catatan_kesehatan_harian WHERE id = ? AND pengguna_id = ?',
      [id, penggunaId]
    );
    return rows[0];
  }

  async update(id, pengunnaId, data) {
    const allowedFields = [
      'berat_badan', 'tinggi_badan', 'tekanan_darah_sistolik', 'tekanan_darah_diastolik',
      'gula_darah', 'detak_jantung', 'suhu_tubuh', 'langkah_kaki', 'mood', 'catatan'
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

    values.push(id, pengunnaId);
    const query = `UPDATE catatan_kesehatan_harian SET ${updates.join(', ')} WHERE id = ? AND pengguna_id = ?`;
    await db.execute(query, values);
    return true;
  }

  async hapus(id, penggunaId) {
    await db.execute('DELETE FROM catatan_kesehatan_harian WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    return true;
  }

  async ringkasan(penggunaId, hariTerakhir = 7) {
    const [rows] = await db.execute(
      `SELECT 
        AVG(berat_badan) as rata_berat_badan,
        AVG(tekanan_darah_sistolik) as rata_sistolik,
        AVG(tekanan_darah_diastolik) as rata_diastolik,
        AVG(gula_darah) as rata_gula,
        AVG(detak_jantung) as rata_detak,
        SUM(langkah_kaki) as total_langkah
       FROM catatan_kesehatan_harian 
       WHERE pengguna_id = ? AND tgl_dicatat >= DATE_SUB(NOW(), INTERVAL ? DAY)`,
      [penggunaId, hariTerakhir]
    );
    return rows[0];
  }

  async grafik(penggunaId, filter) {
    // filter = 'minggu', 'bulan', 'tahun'
    let interval = 7;
    let formatGroup = '%Y-%m-%d';
    
    if (filter === 'bulan') {
      interval = 30;
    } else if (filter === 'tahun') {
      interval = 365;
      formatGroup = '%Y-%m'; // group by month
    }

    const [rows] = await db.execute(
      `SELECT 
        DATE_FORMAT(tgl_dicatat, '${formatGroup}') as tanggal,
        AVG(berat_badan) as rata_berat_badan,
        AVG(tekanan_darah_sistolik) as rata_sistolik,
        AVG(tekanan_darah_diastolik) as rata_diastolik,
        AVG(gula_darah) as rata_gula,
        AVG(detak_jantung) as rata_detak
       FROM catatan_kesehatan_harian 
       WHERE pengguna_id = ? AND tgl_dicatat >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY tanggal
       ORDER BY tanggal ASC`,
      [penggunaId, interval]
    );
    return rows;
  }
}

module.exports = new KesehatanRepository();
