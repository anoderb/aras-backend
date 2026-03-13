const AktivitasRepository = require('../repositories/aktivitas.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class AktivitasService {
  async riwayat(userId, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await AktivitasRepository.riwayatPaging(userId, _limit, offset);
    const meta = buatPagination(_page, _limit, total);

    return { data, meta };
  }

  async tambah(userId, payload) {
    // Estimasi kalori kotor jika user tidak menginput kalori_terbakar
    if (payload.kalori_terbakar === undefined || payload.kalori_terbakar === null) {
      let pengali = 3.5; // ringan
      if (payload.intensitas === 'sedang') pengali = 5.0;
      if (payload.intensitas === 'berat') pengali = 8.0;
      
      // Asumsi default berat badan 65kg untuk kalkulasi cepat (MET * BB * (Durasi/60))
      payload.kalori_terbakar = parseFloat((pengali * 65 * (payload.durasi_menit / 60)).toFixed(2));
    }

    return await AktivitasRepository.tambah(userId, payload);
  }

  async detail(userId, id) {
    const record = await AktivitasRepository.findDetail(id, userId);
    if (!record) throw new Error('Data log aktivitas tidak ditemukan');
    return record;
  }

  async update(userId, id, payload) {
    const record = await AktivitasRepository.findDetail(id, userId);
    if (!record) throw new Error('Data log aktivitas tidak ditemukan');

    await AktivitasRepository.update(id, userId, payload);
    return await this.detail(userId, id);
  }

  async hapus(userId, id) {
    const record = await AktivitasRepository.findDetail(id, userId);
    if (!record) throw new Error('Data log aktivitas tidak ditemukan');

    await AktivitasRepository.hapus(id, userId);
    return true;
  }

  async ringkasan(userId) {
    return await AktivitasRepository.ringkasan(userId);
  }
}

module.exports = new AktivitasService();
