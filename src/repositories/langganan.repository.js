const db = require('../config/database');

class LanggananRepository {
  async getStatus(penggunaId) {
    const [rows] = await db.execute(
      'SELECT langganan FROM pengguna WHERE id = ?',
      [penggunaId]
    );
    return rows[0] ? rows[0].langganan : 'gratis';
  }

  async updateStatus(penggunaId, status) {
    await db.execute(
      'UPDATE pengguna SET langganan = ? WHERE id = ?',
      [status, penggunaId]
    );
    return true;
  }
}

module.exports = new LanggananRepository();
