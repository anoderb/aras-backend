const db = require('../config/database');

const AuthRepository = {
  // Cek apakah email atau no telepon sudah terdaftar
  cariPenggunaByEmailAtauTelepon: async (email, noTelepon) => {
    const [rows] = await db.execute(
      'SELECT * FROM pengguna WHERE email = ? OR no_telepon = ? LIMIT 1',
      [email, noTelepon]
    );
    return rows[0];
  },

  cariPenggunaByEmail: async (email) => {
    const [rows] = await db.execute(
      'SELECT * FROM pengguna WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0];
  },

  cariPenggunaById: async (id) => {
    const [rows] = await db.execute(
      'SELECT id, nama, email, no_telepon, peran, status_aktif, foto_profil FROM pengguna WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0];
  },

  buatPenggunaBaru: async (data) => {
    const { nama, email, no_telepon, kata_sandi, peran } = data;
    const [result] = await db.execute(
      'INSERT INTO pengguna (nama, email, no_telepon, kata_sandi, peran, status_aktif) VALUES (?, ?, ?, ?, ?, ?)',
      [nama, email, no_telepon, kata_sandi, peran || 'user', true] // Langsung aktif karena OTP dilewati
    );
    return result.insertId;
  },

  updateKataSandi: async (id, kataSandiBaru) => {
    const [result] = await db.execute(
      'UPDATE pengguna SET kata_sandi = ? WHERE id = ?',
      [kataSandiBaru, id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = AuthRepository;
