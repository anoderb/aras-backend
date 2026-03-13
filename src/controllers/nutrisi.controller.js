const NutrisiService = require('../services/nutrisi.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class NutrisiController {
  async riwayatMakanan(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await NutrisiService.riwayat(req.user.id, halaman, per_halaman);
      berhasil(res, data, 'Riwayat makanan berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async tambahMakanan(req, res) {
    try {
      await NutrisiService.tambah(req.user.id, req.body);
      berhasil(res, null, 'Log makanan berhasil disimpan', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async detailMakanan(req, res) {
    try {
      const data = await NutrisiService.detail(req.user.id, req.params.id);
      berhasil(res, data, 'Detail makanan berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async updateMakanan(req, res) {
    try {
      const data = await NutrisiService.update(req.user.id, req.params.id, req.body);
      berhasil(res, data, 'Log makanan berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapusMakanan(req, res) {
    try {
      await NutrisiService.hapus(req.user.id, req.params.id);
      berhasil(res, null, 'Log makanan berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async ringkasanHarian(req, res) {
    try {
      const data = await NutrisiService.ringkasanHarian(req.user.id);
      berhasil(res, data, 'Ringkasan nutrisi harian berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async grafik(req, res) {
    try {
      const data = await NutrisiService.grafik(req.user.id);
      berhasil(res, data, 'Grafik nutrisi berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  // Publik Endpoints
  async cariMakanan(req, res) {
    try {
      const data = await NutrisiService.cariMakanan(req.query.q || '');
      berhasil(res, data, 'Hasil pencarian makanan');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async cariBarcode(req, res) {
    try {
      const data = await NutrisiService.cariBarcode(req.params.kode);
      berhasil(res, data, 'Hasil scan barcode');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async databaseLokal(req, res) {
    try {
      const data = await NutrisiService.databaseLokal();
      berhasil(res, data, 'Database makanan lokal');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new NutrisiController();
