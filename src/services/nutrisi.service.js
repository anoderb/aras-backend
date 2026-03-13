const NutrisiRepository = require('../repositories/nutrisi.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class NutrisiService {
  async riwayat(userId, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await NutrisiRepository.riwayatPaging(userId, _limit, offset);
    const meta = buatPagination(_page, _limit, total);

    return { data, meta };
  }

  async tambah(userId, payload) {
    return await NutrisiRepository.tambah(userId, payload);
  }

  async ambilDetail(userId, id) {
    const record = await NutrisiRepository.cariDetail(id, userId);
    if (!record) throw new Error('Data log makanan tidak ditemukan');
    return record;
  }

  async perbarui(userId, id, payload) {
    const record = await NutrisiRepository.cariDetail(id, userId);
    if (!record) throw new Error('Data log makanan tidak ditemukan');

    await NutrisiRepository.perbarui(id, userId, payload);
    return await this.ambilDetail(userId, id);
  }

  async hapus(userId, id) {
    const record = await NutrisiRepository.cariDetail(id, userId);
    if (!record) throw new Error('Data log makanan tidak ditemukan');

    await NutrisiRepository.hapus(id, userId);
    return true;
  }

  async ambilRingkasanHarian(userId) {
    return await NutrisiRepository.ambilRingkasanHarian(userId);
  }

  async ambilGrafik(userId) {
    return await NutrisiRepository.ambilGrafik(userId, 7);
  }

  async cariMakanan(query) {
    return [
      { nama: "Nasi Goreng Spesial", porsi: 1, satuan: "porsi", kalori: 550, karbohidrat: 60, protein: 15, lemak: 20 },
      { nama: `Pencarian: ${query} (MOCK)`, porsi: 100, satuan: "gram", kalori: 200, karbohidrat: 20, protein: 5, lemak: 5 }
    ];
  }

  async cariBarcode(kode) {
    return {
      barcode: kode,
      nama: "Susu UHT Coklat Mock",
      kalori: 150,
      karbohidrat: 20,
      protein: 8,
      lemak: 5
    };
  }

  async databaseLokal() {
    return [
      { id: 1, nama: "Nasi Putih", kalori: 130 },
      { id: 2, nama: "Ayam Goreng", kalori: 250 },
      { id: 3, nama: "Tempe Mendoan", kalori: 120 }
    ];
  }
}

module.exports = new NutrisiService();
