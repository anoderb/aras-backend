const SecondOpinionRepository = require('../repositories/second-opinion.repository');
const DokterRepository = require('../repositories/dokter.repository');

class SecondOpinionService {
  async ajukan(penggunaId, payload) {
    const data = { ...payload, pengguna_id: penggunaId };
    const id = await SecondOpinionRepository.create(data);
    return await SecondOpinionRepository.findById(id);
  }

  async riwayatUser(penggunaId) {
    return await SecondOpinionRepository.findAllByUser(penggunaId);
  }

  async detail(id, penggunaId, peran) {
    const data = await SecondOpinionRepository.findById(id);
    if (!data) throw new Error('Data tidak ditemukan');

    // Auth Check
    if (peran === 'user' && data.pengguna_id !== penggunaId) throw new Error('Akses ditolak');
    
    if (peran === 'dokter') {
      const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
      if (data.dokter_id !== profilDokter.id) throw new Error('Akses ditolak');
    }

    return data;
  }

  async batalkan(id, penggunaId) {
    const data = await SecondOpinionRepository.findById(id);
    if (!data || data.pengguna_id !== penggunaId) throw new Error('Data tidak ditemukan');
    if (data.status !== 'menunggu') throw new Error('Hanya bisa membatalkan request yang sedang menunggu');

    return await SecondOpinionRepository.updateStatus(id, 'dibatalkan'); // Need enum update if dibatalkan not exist
  }

  // DOKTER
  async antrianDokter(penggunaId) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    if (!profilDokter) throw new Error('Profil dokter tidak ditemukan');
    return await SecondOpinionRepository.findAllByDokter(profilDokter.id);
  }

  async beriPendapat(id, penggunaId, pendapat) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    const data = await SecondOpinionRepository.findById(id);
    if (!data || data.dokter_id !== profilDokter.id) throw new Error('Data tidak ditemukan');

    return await SecondOpinionRepository.updatePendapat(id, pendapat);
  }
}

module.exports = new SecondOpinionService();
