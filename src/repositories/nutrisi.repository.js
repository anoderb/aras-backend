const db = require('../config/database');

class NutrisiRepository {
  async tambah(penggunaId, data) {
    const fields = [
      'pengguna_id', 'nama_makanan', 'porsi', 'satuan_porsi', 
      'kalori', 'karbohidrat', 'protein', 'lemak', 
      'sumber_data', 'barcode', 'waktu_makan'
    ];
    
    const values = fields.map(field => field === 'pengguna_id' ? penggunaId : data[field] !== undefined ? data[field] : null);
    const placeholders = fields.map(() => '?').join(', ');
    
    const query = `INSERT INTO log_makanan (${fields.join(', ')}) VALUES (${placeholders})`;
    const [result] = await db.execute(query, values);
    return result.insertId;
  }

  async riwayatPaging(penggunaId, limit, offset) {
    const [rows] = await db.execute(
      `SELECT * FROM log_makanan WHERE pengguna_id = ? ORDER BY tgl_dicatat DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`,
      [penggunaId]
    );
    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM log_makanan WHERE pengguna_id = ?`,
      [penggunaId]
    );
    return { data: rows, total };
  }

  async findDetail(id, penggunaId) {
    const [rows] = await db.execute(
      'SELECT * FROM log_makanan WHERE id = ? AND pengguna_id = ?',
      [id, penggunaId]
    );
    return rows[0];
  }

  async update(id, penggunaId, data) {
    const allowedFields = [
      'nama_makanan', 'porsi', 'satuan_porsi', 'kalori', 
      'karbohidrat', 'protein', 'lemak', 'sumber_data', 
      'barcode', 'waktu_makan'
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

    values.push(id, penggunaId);
    const query = `UPDATE log_makanan SET ${updates.join(', ')} WHERE id = ? AND pengguna_id = ?`;
    await db.execute(query, values);
    return true;
  }

  async hapus(id, penggunaId) {
    await db.execute('DELETE FROM log_makanan WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    return true;
  }

  async ringkasanHarian(penggunaId) {
    // Get summary specifically for today
    const [rows] = await db.execute(
      `SELECT 
        SUM(kalori) as total_kalori,
        SUM(karbohidrat) as total_karbohidrat,
        SUM(protein) as total_protein,
        SUM(lemak) as total_lemak
       FROM log_makanan 
       WHERE pengguna_id = ? AND DATE(tgl_dicatat) = CURDATE()`,
      [penggunaId]
    );
    return rows[0];
  }

  async grafik(penggunaId, hariTerakhir = 7) {
    const [rows] = await db.execute(
      `SELECT 
        DATE(tgl_dicatat) as tanggal,
        SUM(kalori) as total_kalori,
        SUM(karbohidrat) as total_karbohidrat,
        SUM(protein) as total_protein,
        SUM(lemak) as total_lemak
       FROM log_makanan 
       WHERE pengguna_id = ? AND tgl_dicatat >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY DATE(tgl_dicatat)
       ORDER BY tanggal ASC`,
      [penggunaId, hariTerakhir]
    );
    return rows;
  }
}

module.exports = new NutrisiRepository();
