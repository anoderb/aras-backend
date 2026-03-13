const JanjiTemuRepository = require('../repositories/janji_temu.repository');
const DokterRepository = require('../repositories/dokter.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class JanjiTemuService {
  async buatJanji(penggunaId, payload) {
    const data = { ...payload, pengguna_id: penggunaId };
    const id = await JanjiTemuRepository.create(data);
    return await JanjiTemuRepository.findById(id);
  }

  async detailJanji(id, penggunaId, peran) {
    const janji = await JanjiTemuRepository.findById(id);
    if (!janji) throw new Error('Janji temu tidak ditemukan');
    
    // Auth Check
    if (peran === 'user' && janji.pengguna_id !== penggunaId) throw new Error('Anda tidak memiliki akses ke janji temu ini');
    
    if (peran === 'dokter') {
      const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
      if (janji.dokter_id !== profilDokter.id) throw new Error('Anda tidak memiliki akses ke janji temu ini');
    }
    
    return janji;
  }

  async daftarJanjiUser(penggunaId, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await JanjiTemuRepository.findAllByUser(penggunaId, _limit, offset);
    return { data, meta: buatPagination(_page, _limit, total) };
  }

  async daftarJanjiDokter(penggunaId, page = 1, limit = 10) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    if (!profilDokter) throw new Error('Profil dokter tidak ditemukan');

    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await JanjiTemuRepository.findAllByDokter(profilDokter.id, _limit, offset);
    return { data, meta: buatPagination(_page, _limit, total) };
  }

  async batalkanJanji(id, penggunaId) {
    const janji = await JanjiTemuRepository.findById(id);
    if (!janji || janji.pengguna_id !== penggunaId) throw new Error('Janji temu tidak ditemukan');
    if (janji.status === 'selesai') throw new Error('Tidak bisa membatalkan janji yang sudah selesai');
    
    return await JanjiTemuRepository.updateStatus(id, 'dibatalkan');
  }

  async konfirmasiJanji(id, penggunaId) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    const janji = await JanjiTemuRepository.findById(id);
    if (!janji || janji.dokter_id !== profilDokter.id) throw new Error('Janji temu tidak ditemukan');
    
    return await JanjiTemuRepository.updateStatus(id, 'dikonfirmasi');
  }

  async rescheduleJanji(id, penggunaId, payload) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    const janji = await JanjiTemuRepository.findById(id);
    if (!janji || janji.dokter_id !== profilDokter.id) throw new Error('Janji temu tidak ditemukan');
    
    const { tgl_jadwal, catatan } = payload;
    return await JanjiTemuRepository.reschedule(id, tgl_jadwal, catatan);
  }
}

module.exports = new JanjiTemuService();
