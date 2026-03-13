const db = require('../config/database');

class AuthRepository {
  // Cek apakah email atau no telepon sudah terdaftar
  async cariPenggunaByEmailAtauTelepon(email, noTelepon) {
    const [rows] = await db.execute(
      'SELECT * FROM pengguna WHERE email = ? OR no_telepon = ? LIMIT 1',
      [email, noTelepon]
    );
    return rows[0];
  }

  async cariPenggunaByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM pengguna WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0];
  }

  async cariPenggunaById(id) {
    const [rows] = await db.execute(
      'SELECT id, nama, email, no_telepon, peran, status_aktif, foto_profil FROM pengguna WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0];
  }

  async buatPenggunaBaru(data) {
    const { nama, email, no_telepon, kata_sandi, peran } = data;
    const [result] = await db.execute(
      'INSERT INTO pengguna (nama, email, no_telepon, kata_sandi, peran, status_aktif) VALUES (?, ?, ?, ?, ?, ?)',
      [nama, email, no_telepon, kata_sandi, peran || 'user', true] // Langsung aktif karena OTP dilewati
    );
    return result.insertId;
  }

  async updateKataSandi(id, kataSandiBaru) {
    const [result] = await db.execute(
      'UPDATE pengguna SET kata_sandi = ? WHERE id = ?',
      [kataSandiBaru, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = new AuthRepository();
