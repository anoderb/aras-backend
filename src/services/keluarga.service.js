const KeluargaRepository = require('../repositories/keluarga.repository');
const PenggunaRepository = require('../repositories/pengguna.repository');
const AuthRepository = require('../repositories/auth.repository');
const bcryptHelper = require('../helpers/bcrypt.helper');

class KeluargaService {
  async getKeluarga(pemilikId) {
    return await KeluargaRepository.getKeluarga(pemilikId);
  }

  async tambahAnggota(pemilikId, data) {
    let anggotaId;

    if (data.email) {
      // Trying to link an existing user
      const existingUser = await AuthRepository.findByEmail(data.email);
      if (!existingUser) throw new Error('Pengguna dengan email tersebut tidak ditemukan');
      if (existingUser.id === pemilikId) throw new Error('Tidak bisa menambahkan akun Anda sendiri ke daftar keluarga');
      anggotaId = existingUser.id;
    } else {
      // Create a sub-account (managed by owner)
      const dummyEmail = `member_${Date.now()}_${pemilikId}@aras.local`;
      const dummySandi = await bcryptHelper.hashPassword('Anggota123!');
      
      const newUser = {
        nama: data.nama,
        email: dummyEmail,
        kata_sandi: dummySandi,
        peran: 'user',
        tgl_lahir: data.tgl_lahir || null,
        jenis_kelamin: data.jenis_kelamin || null,
        golongan_darah: data.golongan_darah || null
      };

      anggotaId = await AuthRepository.createUser(newUser);
    }

    const exists = await KeluargaRepository.checkRelasiExists(pemilikId, anggotaId);
    if (exists) throw new Error('Anggota ini sudah ada di daftar keluarga Anda');

    await KeluargaRepository.tambahAnggota(pemilikId, anggotaId, data.hubungan);
    return true; // Simple boolean return on success
  }

  async getDetail(pemilikId, relasiId) {
    const detail = await KeluargaRepository.findDetail(relasiId, pemilikId);
    if (!detail) throw new Error('Data anggota keluarga tidak ditemukan');
    return detail;
  }

  async updateAnggota(pemilikId, relasiId, data) {
    const detail = await KeluargaRepository.findDetail(relasiId, pemilikId);
    if (!detail) throw new Error('Data anggota keluarga tidak ditemukan');

    if (data.hubungan) {
      await KeluargaRepository.updateHubungan(relasiId, data.hubungan);
    }

    const profilData = {
      nama: data.nama,
      tgl_lahir: data.tgl_lahir,
      jenis_kelamin: data.jenis_kelamin,
      golongan_darah: data.golongan_darah
    };
    
    // Cleaning undefined keys
    Object.keys(profilData).forEach(key => profilData[key] === undefined && delete profilData[key]);

    if (Object.keys(profilData).length > 0) {
      await PenggunaRepository.updateProfil(detail.anggota_id, profilData);
    }

    return await this.getDetail(pemilikId, relasiId);
  }

  async hapusAnggota(pemilikId, relasiId) {
    const detail = await KeluargaRepository.findDetail(relasiId, pemilikId);
    if (!detail) throw new Error('Data anggota keluarga tidak ditemukan');

    await KeluargaRepository.hapusAnggota(relasiId);
    return true;
  }

  async getKesehatan(pemilikId, relasiId) {
    const detail = await KeluargaRepository.findDetail(relasiId, pemilikId);
    if (!detail) throw new Error('Data anggota keluarga tidak ditemukan');
    
    const db = require('../config/database');
    const [catatan] = await db.execute(
      'SELECT id, berat_badan, tinggi_badan, tekanan_darah_sistolik, tekanan_darah_diastolik, gula_darah, detak_jantung, suhu_tubuh, tgl_dicatat FROM catatan_kesehatan_harian WHERE pengguna_id = ? ORDER BY tgl_dicatat DESC LIMIT 10',
      [detail.anggota_id]
    );
    return catatan;
  }
}

module.exports = new KeluargaService();
