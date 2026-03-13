const PenggunaRepository = require('../repositories/pengguna.repository');
const bcryptHelper = require('../helpers/bcrypt.helper');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

class PenggunaService {
  async getProfil(userId) {
    const user = await PenggunaRepository.findById(userId);
    if (!user) throw new Error('Pengguna tidak ditemukan');
    return user;
  }

  async updateProfil(userId, data) {
    const user = await PenggunaRepository.findById(userId);
    if (!user) throw new Error('Pengguna tidak ditemukan');
    
    await PenggunaRepository.updateProfil(userId, data);
    return await PenggunaRepository.findById(userId);
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
      await PenggunaRepository.updateFotoProfil(userId, result.secure_url);
      
      // Hapus file lokal
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

      return { foto_profil: result.secure_url };
    } catch (error) {
      if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
      throw new Error('Gagal mengunggah foto profil');
    }
  }

  async gantiSandi(userId, sandiLama, sandiBaru) {
    const user = await PenggunaRepository.findPasswordById(userId);
    if (!user) throw new Error('Pengguna tidak ditemukan');

    const isMatch = await bcryptHelper.comparePassword(sandiLama, user.kata_sandi);
    if (!isMatch) throw new Error('Kata sandi lama tidak sesuai');

    const hashedSandi = await bcryptHelper.hashPassword(sandiBaru);
    await PenggunaRepository.updateSandi(userId, hashedSandi);
    
    return true;
  }

  async hapusAkun(userId) {
    const user = await PenggunaRepository.findById(userId);
    if (!user) throw new Error('Pengguna tidak ditemukan');
    
    await PenggunaRepository.hapusAkun(userId);
    return true;
  }

  async getDashboard(userId) {
    return await PenggunaRepository.getDashboardData(userId);
  }

  async getStatistik(userId) {
    return await PenggunaRepository.getStatistik(userId);
  }
}

module.exports = new PenggunaService();
