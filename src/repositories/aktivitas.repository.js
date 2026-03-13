const db = require('../config/database');

class AktivitasRepository {
  async tambah(penggunaId, data) {
    const query = `
      INSERT INTO log_aktivitas (pengguna_id, jenis_aktivitas, durasi_menit, kalori_terbakar, intensitas, catatan) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      penggunaId,
      data.jenis_aktivitas,
      data.durasi_menit,
      data.kalori_terbakar !== undefined ? data.kalori_terbakar : null,
      data.intensitas,
      data.catatan !== undefined ? data.catatan : null
    ];
    
    const [result] = await db.execute(query, values);
    return result.insertId;
  }

  async riwayatPaging(penggunaId, limit, offset) {
    const [rows] = await db.execute(
      `SELECT * FROM log_aktivitas WHERE pengguna_id = ? ORDER BY tgl_dicatat DESC LIMIT ? OFFSET ?`,
      [penggunaId, limit, offset]
    );
    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM log_aktivitas WHERE pengguna_id = ?`,
      [penggunaId]
    );
    return { data: rows, total };
  }

  async findDetail(id, penggunaId) {
    const [rows] = await db.execute(
      'SELECT * FROM log_aktivitas WHERE id = ? AND pengguna_id = ?',
      [id, penggunaId]
    );
    return rows[0];
  }

  async update(id, penggunaId, data) {
    const allowedFields = ['jenis_aktivitas', 'durasi_menit', 'kalori_terbakar', 'intensitas', 'catatan'];

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
    const query = `UPDATE log_aktivitas SET ${updates.join(', ')} WHERE id = ? AND pengguna_id = ?`;
    await db.execute(query, values);
    return true;
  }

  async hapus(id, penggunaId) {
    await db.execute('DELETE FROM log_aktivitas WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    return true;
  }

  async ringkasan(penggunaId) {
    // Return summary specifically for today
    const [rows] = await db.execute(
      `SELECT 
        SUM(durasi_menit) as total_durasi,
        SUM(kalori_terbakar) as total_kalori_terbakar,
        COUNT(id) as total_aktivitas
       FROM log_aktivitas 
       WHERE pengguna_id = ? AND DATE(tgl_dicatat) = CURDATE()`,
      [penggunaId]
    );
    return rows[0];
  }
}

module.exports = new AktivitasRepository();
