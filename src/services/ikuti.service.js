const IkutiRepository = require('../repositories/ikuti.repository');
const PenggunaRepository = require('../repositories/pengguna.repository');

class IkutiService {
  async ikuti(pengikutId, diikutiId) {
    if (pengikutId == diikutiId) throw new Error('Anda tidak bisa mengikuti diri sendiri');

    const target = await PenggunaRepository.findById(diikutiId);
    if (!target) throw new Error('Pengguna tidak ditemukan');

    return await IkutiRepository.follow(pengikutId, diikutiId);
  }

  async berhentiIkuti(pengikutId, diikutiId) {
    return await IkutiRepository.unfollow(pengikutId, diikutiId);
  }

  async daftarPengikut(penggunaId) {
    return await IkutiRepository.findFollowers(penggunaId);
  }

  async daftarMengikuti(penggunaId) {
    return await IkutiRepository.findFollowing(penggunaId);
  }

  async cekStatus(pengikutId, diikutiId) {
    return await IkutiRepository.checkStatus(pengikutId, diikutiId);
  }
}

module.exports = new IkutiService();
