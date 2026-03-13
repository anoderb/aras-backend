const ObatRepository = require('../repositories/obat.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class ObatService {
  async daftarAktif(userId) {
    return await ObatRepository.daftarAktif(userId);
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

  async detail(userId, id) {
    const record = await ObatRepository.findDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');
    return record;
  }

  async update(userId, id, payload) {
    const record = await ObatRepository.findDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    await ObatRepository.update(id, userId, payload);
    return await this.detail(userId, id);
  }

  async hapus(userId, id) {
    const record = await ObatRepository.findDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    await ObatRepository.hapus(id, userId);
    return true;
  }

  async nonaktifkan(userId, id) {
    const record = await ObatRepository.findDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    return await ObatRepository.nonaktifkan(id, userId);
  }

  async logMinum(userId, id, payload) {
    const record = await ObatRepository.findDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    return await ObatRepository.logMinum(userId, id, payload);
  }

  async statistikKepatuhan(userId, id) {
    const record = await ObatRepository.findDetail(id, userId);
    if (!record) throw new Error('Data obat tidak ditemukan');

    return await ObatRepository.statistikKepatuhan(id, userId);
  }

  async cariObat(query) {
    // Mock data pencarian obat (BPOM / OpenFDA simulation)
    return [
      { id: 1, nama: "Paracetamol 500mg", jenis: "Tablet", deskripsi: "Meredakan demam dan nyeri" },
      { id: 2, nama: `Hasil Pencarian: ${query} (MOCK)`, jenis: "Umum", deskripsi: "Deskripsi obat hasil simulasi" }
    ];
  }

  async cariBarcode(kode) {
    // Mock scan barcode obat
    return {
      barcode: kode,
      nama: "Amoxicillin 500mg (MOCK)",
      keterangan: "Antibiotik spektrum luas"
    };
  }

  async cekInteraksi(obatIds) {
    // Mock cek interaksi antar obat
    return {
      interaksi: [
        { level: "low", keterangan: "Tidak ditemukan interaksi berbahaya yang signifikan antar obat tersebut (Simulasi)" }
      ]
    };
  }
}

module.exports = new ObatService();
