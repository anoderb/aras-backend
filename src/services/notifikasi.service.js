const NotifikasiRepository = require('../repositories/notifikasi.repository');

class NotifikasiService {
  async daftarNotifikasi(penggunaId) {
    return await NotifikasiRepository.findAllByPengguna(penggunaId);
  }

  async jumlahBelumDibaca(penggunaId) {
    return await NotifikasiRepository.countUnread(penggunaId);
  }

  async bacaNotifikasi(id, penggunaId) {
    return await NotifikasiRepository.markAsRead(id, penggunaId);
  }

  async bacaSemua(penggunaId) {
    return await NotifikasiRepository.markAllAsRead(penggunaId);
  }

  async hapusNotifikasi(id, penggunaId) {
    return await NotifikasiRepository.delete(id, penggunaId);
  }
}

module.exports = new NotifikasiService();
