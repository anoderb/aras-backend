const ArtikelRepository = require('../repositories/artikel.repository');
const DokterRepository = require('../repositories/dokter.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class ArtikelService {
  async daftarArtikel(query, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await ArtikelRepository.findAllPaging(_limit, offset, query);
    return { data, meta: buatPagination(_page, _limit, total) };
  }

  async artikelPopuler(limit = 5) {
    return await ArtikelRepository.findPopuler(limit);
  }

  async detailArtikel(id) {
    const artikel = await ArtikelRepository.findById(id);
    if (!artikel) throw new Error('Artikel tidak ditemukan');
    
    await ArtikelRepository.incrementViews(id);
    return artikel;
  }

  // Dokter
  async buatArtikel(penggunaId, payload) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    if (!profilDokter) throw new Error('Hanya dokter yang dapat menulis artikel');

    const id = await ArtikelRepository.create({ ...payload, dokter_id: profilDokter.id });
    return await ArtikelRepository.findById(id);
  }

  async updateArtikel(id, penggunaId, payload) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    await ArtikelRepository.update(id, profilDokter.id, payload);
    return await ArtikelRepository.findById(id);
  }

  async hapusArtikel(id, penggunaId) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    return await ArtikelRepository.delete(id, profilDokter.id);
  }

  async artikelSaya(penggunaId) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    if (!profilDokter) throw new Error('Profil dokter tidak ditemukan');
    return await ArtikelRepository.findByDokter(profilDokter.id);
  }

  // User
  async simpanArtikel(penggunaId, artikelId) {
    const artikel = await ArtikelRepository.findById(artikelId);
    if (!artikel) throw new Error('Artikel tidak ditemukan');
    await ArtikelRepository.bookmark(penggunaId, artikelId);
    return true;
  }

  async hapusSimpan(penggunaId, artikelId) {
    await ArtikelRepository.unbookmark(penggunaId, artikelId);
    return true;
  }

  async artikelTersimpan(penggunaId) {
    return await ArtikelRepository.findSaved(penggunaId);
  }
}

module.exports = new ArtikelService();
