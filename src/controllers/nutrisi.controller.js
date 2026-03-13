const NutrisiService = require('../services/nutrisi.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class NutrisiController {
  async riwayatMakanan(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await NutrisiService.riwayat(req.user.id, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Riwayat makanan berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async tambahMakanan(req, res) {
    try {
      await NutrisiService.tambah(req.user.id, req.body);
      return res.status(201).json(berhasil('Log makanan berhasil disimpan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async detailMakanan(req, res) {
    try {
      const data = await NutrisiService.detail(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Detail makanan berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async updateMakanan(req, res) {
    try {
      const data = await NutrisiService.update(req.user.id, req.params.id, req.body);
      return res.status(200).json(berhasil('Log makanan berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapusMakanan(req, res) {
    try {
      await NutrisiService.hapus(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Log makanan berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async ringkasanHarian(req, res) {
    try {
      const data = await NutrisiService.ringkasanHarian(req.user.id);
      return res.status(200).json(berhasil('Ringkasan nutrisi harian berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async grafik(req, res) {
    try {
      const data = await NutrisiService.grafik(req.user.id);
      return res.status(200).json(berhasil('Grafik nutrisi berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  // Publik Endpoints
  async cariMakanan(req, res) {
    try {
      const data = await NutrisiService.cariMakanan(req.query.q || '');
      return res.status(200).json(berhasil('Hasil pencarian makanan', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async cariBarcode(req, res) {
    try {
      const data = await NutrisiService.cariBarcode(req.params.kode);
      return res.status(200).json(berhasil('Hasil scan barcode', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async databaseLokal(req, res) {
    try {
      const data = await NutrisiService.databaseLokal();
      return res.status(200).json(berhasil('Database makanan lokal', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new NutrisiController();
