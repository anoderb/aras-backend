const db = require('../config/database');

class AuthRepository {
  // Cek apakah email atau no telepon sudah terdaftar
  async cariEmailAtauTelepon(email, noTelepon) {
    const [rows] = await db.execute(
      'SELECT id, nama, email, no_telepon, peran, status_aktif FROM pengguna WHERE email = ? OR no_telepon = ? LIMIT 1',
      [email, noTelepon]
    );
    return rows[0];
  }

  async cariEmail(email) {
    const [rows] = await db.execute(
      'SELECT id, nama, email, no_telepon, peran, status_aktif, kata_sandi, foto_profil FROM pengguna WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0];
  }

  async cariBerdasarkanId(id) {
    const [rows] = await db.execute(
      'SELECT id, nama, email, no_telepon, peran, status_aktif, foto_profil FROM pengguna WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0];
  }

  async tambahPengguna(data) {
    const { nama, email, no_telepon, kata_sandi, peran } = data;
    const [result] = await db.execute(
      'INSERT INTO pengguna (nama, email, no_telepon, kata_sandi, peran, status_aktif) VALUES (?, ?, ?, ?, ?, ?)',
      [nama, email, no_telepon, kata_sandi, peran || 'user', true]
    );
    return result.insertId;
  }

  async perbaruiSandi(id, kataSandiBaru) {
    const [result] = await db.execute(
      'UPDATE pengguna SET kata_sandi = ? WHERE id = ?',
      [kataSandiBaru, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = new AuthRepository();
