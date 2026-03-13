const ForumRepository = require('../repositories/forum.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class ForumService {
  async daftarPertanyaan(query, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await ForumRepository.findAllPaging(_limit, offset, query);
    return { data, meta: buatPagination(_page, _limit, total) };
  }

  async buatPertanyaan(penggunaId, payload) {
    const id = await ForumRepository.createPertanyaan({ ...payload, pengguna_id: penggunaId });
    return await ForumRepository.findById(id);
  }

  async detailPertanyaan(id) {
    const pertanyaan = await ForumRepository.findById(id);
    if (!pertanyaan) throw new Error('Pertanyaan tidak ditemukan');
    const jawaban = await ForumRepository.findJawabanByPertanyaan(id);
    return { ...pertanyaan, jawaban };
  }

  async editPertanyaan(id, penggunaId, payload) {
    const pertanyaan = await ForumRepository.findById(id);
    if (!pertanyaan || pertanyaan.pengguna_id !== penggunaId) throw new Error('Akses ditolak');
    await ForumRepository.updatePertanyaan(id, penggunaId, payload);
    return await ForumRepository.findById(id);
  }

  async hapusPertanyaan(id, penggunaId, peran) {
    const pertanyaan = await ForumRepository.findById(id);
    if (!pertanyaan) throw new Error('Pertanyaan tidak ditemukan');
    if (peran !== 'admin' && pertanyaan.pengguna_id !== penggunaId) throw new Error('Akses ditolak');
    
    await ForumRepository.deletePertanyaan(id, penggunaId);
    return true;
  }

  // Jawaban
  async tambahJawaban(pertanyaanId, penggunaId, peran, payload) {
    const pertanyaan = await ForumRepository.findById(pertanyaanId);
    if (!pertanyaan) throw new Error('Pertanyaan tidak ditemukan');

    const data = {
      pertanyaan_id: pertanyaanId,
      pengguna_id: penggunaId,
      isi: payload.isi,
      is_dari_dokter: peran === 'dokter'
    };
    
    const id = await ForumRepository.createJawaban(data);
    return id;
  }

  async hapusJawaban(jawabanId, penggunaId, peran) {
    await ForumRepository.deleteJawaban(jawabanId, penggunaId);
    return true;
  }

  async tandaiJawabanTerbaik(pertanyaanId, jawabanId, penggunaId) {
    const pertanyaan = await ForumRepository.findById(pertanyaanId);
    if (!pertanyaan || pertanyaan.pengguna_id !== penggunaId) throw new Error('Akses ditolak');
    
    await ForumRepository.setTerbaik(pertanyaanId, jawabanId);
    return true;
  }

  async sukaJawaban(penggunaId, jawabanId) {
    return await ForumRepository.toggleSukaJawaban(penggunaId, jawabanId);
  }
}

module.exports = new ForumService();
