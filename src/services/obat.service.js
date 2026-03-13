const ObatRepository = require('../repositories/obat.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class ObatService {
  async ambilDaftarAktif(userId) {
    return await ObatRepository.ambilDaftarAktif(userId);
  }

  async riwayat(userId, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await ObatRepository.riwayatPaging(userId, _limit, offset);
    const meta = buatPagination(_page, _limit, total);

    return { data, meta };
  }

  async tambah(userId, payload) {
    return await ObatRepository.tambah(userId, payload);
  }

  async ambilDetail(userId, id) {
    const record = await ObatRepository.cariDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');
    return record;
  }

  async perbarui(userId, id, payload) {
    const record = await ObatRepository.cariDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    await ObatRepository.perbarui(id, userId, payload);
    return await this.ambilDetail(userId, id);
  }

  async hapus(userId, id) {
    const record = await ObatRepository.cariDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    await ObatRepository.hapus(id, userId);
    return true;
  }

  async nonaktifkan(userId, id) {
    const record = await ObatRepository.cariDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    return await ObatRepository.nonaktifkan(id, userId);
  }

  async tambahLogMinum(userId, id, payload) {
    const record = await ObatRepository.cariDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    return await ObatRepository.tambahLogMinum(userId, id, payload);
  }

  async ambilStatistikKepatuhan(userId, id) {
    const record = await ObatRepository.cariDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    return await ObatRepository.ambilStatistikKepatuhan(id, userId);
  }

  async cariObat(query) {
    return [
      { id: 1, nama: "Paracetamol 500mg", jenis: "Tablet", deskripsi: "Meredakan demam dan nyeri" },
      { id: 2, nama: `Hasil Pencarian: ${query} (MOCK)`, jenis: "Umum", deskripsi: "Deskripsi obat hasil simulasi" }
    ];
  }

  async cariBarcode(kode) {
    return {
      barcode: kode,
      nama: "Amoxicillin 500mg (MOCK)",
      keterangan: "Antibiotik spektrum luas"
    };
  }

  async cekInteraksi(obatIds) {
    return {
      interaksi: [
        { level: "low", keterangan: "Tidak ditemukan interaksi berbahaya yang signifikan antar obat tersebut (Simulasi)" }
      ]
    };
  }
}

module.exports = new ObatService();
