const DokterRepository = require('../repositories/dokter.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class DokterService {
  async daftarDokter(query, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await DokterRepository.findAllPaging(_limit, offset, query);
    const meta = buatPagination(_page, _limit, total);

    return { data, meta };
  }

  async detailDokter(id) {
    const dokter = await DokterRepository.findById(id);
    if (!dokter) throw new Error('Profil dokter tidak ditemukan');
    return dokter;
  }

  async lihatProfilSendiri(penggunaId) {
    const profil = await DokterRepository.findByPenggunaId(penggunaId);
    if (!profil) throw new Error('Profil dokter anda belum dibuat atau ditemukan');
    return profil;
  }

  async updateProfil(penggunaId, payload) {
    await DokterRepository.updateProfil(penggunaId, payload);
    return await this.lihatProfilSendiri(penggunaId);
  }

  async setKetersediaan(penggunaId, status) {
    return await DokterRepository.setOnlineStatus(penggunaId, status);
  }

  async daftarSpesialisasi() {
    return await DokterRepository.getSpesialisasi();
  }

  async statistik(penggunaId) {
    return await DokterRepository.getStatistik(penggunaId);
  }

  // Admin
  async antrianVerifikasi() {
    return await DokterRepository.getAntrianVerifikasi();
  }

  async prosesVerifikasi(id, adminId, status) {
    const dokter = await DokterRepository.findById(id);
    if (!dokter) throw new Error('Data dokter tidak ditemukan');
    
    return await DokterRepository.verifikasi(id, adminId, status);
  }

  async dokterTerdekat(lat, lng) {
    // Mock pencarian dokter terdekat
    const { data } = await DokterRepository.findAllPaging(5, 0);
    return data.map(d => ({ ...d, jarak: "1.2 km" }));
  }
}

module.exports = new DokterService();
