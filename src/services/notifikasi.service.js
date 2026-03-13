const NotifikasiRepository = require('../repositories/notifikasi.repository');

class NotifikasiService {
  async ambilDaftarNotifikasi(penggunaId) {
    return await NotifikasiRepository.ambilSemuaBerdasarkanPengguna(penggunaId);
  }

  async hitungBelumDibaca(penggunaId) {
    return await NotifikasiRepository.hitungBelumDibaca(penggunaId);
  }

  async tandaiDibaca(id, penggunaId) {
    return await NotifikasiRepository.tandaiDibaca(id, penggunaId);
  }

  async tandaiSemuaDibaca(penggunaId) {
    return await NotifikasiRepository.tandaiSemuaDibaca(penggunaId);
  }

  async hapusNotifikasi(id, penggunaId) {
    return await NotifikasiRepository.hapus(id, penggunaId);
  }
}

module.exports = new NotifikasiService();
