const KesehatanRepository = require('../repositories/kesehatan.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class KesehatanService {
  async riwayat(userId, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await KesehatanRepository.riwayatPaging(userId, _limit, offset);
    const meta = buatPagination(_page, _limit, total);

    return { data, meta };
  }

  async tambah(userId, payload) {
    return await KesehatanRepository.tambah(userId, payload);
  }

  async detail(userId, id) {
    const record = await KesehatanRepository.findDetail(id, userId);
    if (!record) throw new Error('Data catatan kesehatan tidak ditemukan');
    return record;
  }

  async update(userId, id, payload) {
    const record = await KesehatanRepository.findDetail(id, userId);
    if (!record) throw new Error('Data catatan kesehatan tidak ditemukan');

    await KesehatanRepository.update(id, userId, payload);
    return await this.detail(userId, id);
  }

  async hapus(userId, id) {
    const record = await KesehatanRepository.findDetail(id, userId);
    if (!record) throw new Error('Data catatan kesehatan tidak ditemukan');

    await KesehatanRepository.hapus(id, userId);
    return true;
  }

  async ringkasan(userId, rentangWaktu) {
    let hari = 7;
    if (rentangWaktu === 'bulan') hari = 30;
    if (rentangWaktu === 'tahun') hari = 365;

    return await KesehatanRepository.ringkasan(userId, hari);
  }

  async grafik(userId, rentangWaktu) {
    const filter = ['minggu', 'bulan', 'tahun'].includes(rentangWaktu) ? rentangWaktu : 'minggu';
    return await KesehatanRepository.grafik(userId, filter);
  }
  
  async ekspor(userId) {
    // Saat ini sekadar simulasi mock response sesuai rules
    // Implementasi PDF generator seperti PDFKit bisa ditaruh di sini
    return { link_unduh: 'https://cdn.khamdanu.xyz/mock/report-kesehatan.pdf' };
  }
}

module.exports = new KesehatanService();
