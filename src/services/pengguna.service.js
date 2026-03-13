const PenggunaRepository = require('../repositories/pengguna.repository');
const bcryptHelper = require('../helpers/bcrypt.helper');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

class PenggunaService {
  async lihatProfil(userId) {
    const user = await PenggunaRepository.cariBerdasarkanId(userId);
    if (!user) throw new Error('Pengguna tidak ditemukan');
    return user;
  }

  async updateProfil(userId, data) {
    const user = await PenggunaRepository.cariBerdasarkanId(userId);
    if (!user) throw new Error('Pengguna tidak ditemukan');
    
    await PenggunaRepository.perbaruiProfil(userId, data);
    return await PenggunaRepository.cariBerdasarkanId(userId);
  }

  async uploadFotoProfil(userId, file) {
    if (!file) throw new Error('File foto tidak ditemukan');

    try {
      // Upload ke Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'aras/profil',
        transformation: [{ width: 500, height: 500, crop: 'fill' }]
      });

      // Update URL di database
      await PenggunaRepository.perbaruiFotoProfil(userId, result.secure_url);
      
      // Hapus file lokal
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

      return { foto_profil: result.secure_url };
    } catch (error) {
      if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
      throw new Error('Gagal mengunggah foto profil');
    }
  }

  async gantiSandi(userId, sandiLama, sandiBaru) {
    const user = await PenggunaRepository.cariSandiBerdasarkanId(userId);
    if (!user) throw new Error('Pengguna tidak ditemukan');

    const isMatch = await bcryptHelper.cocokkanSandi(sandiLama, user.kata_sandi);
    if (!isMatch) throw new Error('Kata sandi lama tidak sesuai');

    const hashedSandi = await bcryptHelper.hashSandi(sandiBaru);
    await PenggunaRepository.perbaruiSandi(userId, hashedSandi);
    
    return true;
  }

  async hapusAkun(userId) {
    const user = await PenggunaRepository.cariBerdasarkanId(userId);
    if (!user) throw new Error('Pengguna tidak ditemukan');
    
    await PenggunaRepository.hapusAkun(userId);
    return true;
  }

  async ambilDashboard(userId) {
    return await PenggunaRepository.ambilDataDashboard(userId);
  }

  async ambilStatistik(userId) {
    return await PenggunaRepository.ambilStatistik(userId);
  }
}

module.exports = new PenggunaService();
