const AuthRepository = require('../repositories/auth.repository');
const bcryptHelper = require('../helpers/bcrypt.helper');
const { buatToken, buatRefreshToken, verifikasiRefreshToken } = require('../helpers/jwt.helper');

const AuthService = {
  daftar: async (data) => {
    // 1. Cek apakah pengguna sudah ada
    const penggunaSudahAda = await AuthRepository.cariEmailAtauTelepon(data.email, data.no_telepon);
    if (penggunaSudahAda) {
      if (penggunaSudahAda.email === data.email) {
        throw new Error('Email sudah terdaftar');
      }
      throw new Error('Nomor telepon sudah terdaftar');
    }

    // 2. Hash kata sandi
    const hashedPassword = await bcryptHelper.hashSandi(data.kata_sandi);

    // 3. Simpan ke database
    const penggunaId = await AuthRepository.tambahPengguna({
      ...data,
      kata_sandi: hashedPassword
    });

    return {
      id: penggunaId,
      nama: data.nama,
      email: data.email,
      pesan: 'Registrasi berhasil. Silakan login.'
    };
  },

  masuk: async (data) => {
    const { email, kata_sandi } = data;

    // 1. Cek pengguna
    const pengguna = await AuthRepository.cariEmail(email);
    if (!pengguna) {
      throw new Error('Email atau kata sandi salah');
    }

    // 2. Cek status aktif
    if (!pengguna.status_aktif) {
      throw new Error('Akun Anda dinonaktifkan. Silakan hubungi admin.');
    }

    // 3. Verifikasi sandi
    const sandiCocok = await bcryptHelper.cocokkanSandi(kata_sandi, pengguna.kata_sandi);
    if (!sandiCocok) {
      throw new Error('Email atau kata sandi salah');
    }

    // 4. Generate token
    const payload = {
      id: pengguna.id,
      peran: pengguna.peran,
      email: pengguna.email
    };

    const accessToken = buatToken(payload);
    const refreshToken = buatRefreshToken(payload);

    return {
      pengguna: {
        id: pengguna.id,
        nama: pengguna.nama,
        email: pengguna.email,
        peran: pengguna.peran,
        foto_profil: pengguna.foto_profil
      },
      token: accessToken,
      access_token: accessToken,
      refresh_token: refreshToken
    };
  },

  refreshToken: async (tokenRefresh) => {
    // 1. Verifikasi token
    const decoded = verifikasiRefreshToken(tokenRefresh);
    if (!decoded) {
      throw new Error('Refresh token tidak valid atau sudah kedaluwarsa');
    }

    // 2. Cek apakah pengguna masih ada
    const pengguna = await AuthRepository.cariBerdasarkanId(decoded.id);
    if (!pengguna || !pengguna.status_aktif) {
      throw new Error('Pengguna tidak valid atau tidak aktif');
    }

    // 3. Generate token baru
    const payload = {
      id: pengguna.id,
      peran: pengguna.peran,
      email: pengguna.email
    };

    const accessToken = buatToken(payload);
    const newRefreshToken = buatRefreshToken(payload);

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken
    };
  },

  keluar: async (penggunaId) => {
    return true;
  },

  lupaSandi: async (email) => {
    const pengguna = await AuthRepository.cariEmail(email);
    if (!pengguna) {
      throw new Error('Email tidak terdaftar');
    }
    return { pesan: 'Instruksi reset sandi telah dikirim ke email (SIMULASI)' };
  },

  resetSandi: async (data) => {
    throw new Error('Fitur Reset Sandi sedang dinonaktifkan (Simulasi Modul)');
  },

  verifikasiEmail: async (token) => {
    return true;
  },

  kirimUlangOtp: async (email, tipe) => {
    return { pesan: `OTP ${tipe} berhasil dikirim ulang (SIMULASI)` };
  },

  verifikasiOtp: async (email, otp) => {
    return true;
  }
};

module.exports = AuthService;
