const ObatService = require('../services/obat.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class ObatController {
  async daftarAktif(req, res) {
    try {
      const data = await ObatService.ambilDaftarAktif(req.user.id);
      berhasil(res, data, 'Daftar obat aktif berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async tambah(req, res) {
    try {
      const id = await ObatService.tambah(req.user.id, req.body);
      berhasil(res, { id }, 'Obat berhasil ditambahkan', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async riwayat(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await ObatService.riwayat(req.user.id, halaman, per_halaman);
      berhasil(res, data, 'Riwayat obat berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async detail(req, res) {
    try {
      const data = await ObatService.ambilDetail(req.user.id, req.params.id);
      berhasil(res, data, 'Detail obat berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async update(req, res) {
    try {
      const data = await ObatService.perbarui(req.user.id, req.params.id, req.body);
      berhasil(res, data, 'Data obat berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapus(req, res) {
    try {
      await ObatService.hapus(req.user.id, req.params.id);
      berhasil(res, null, 'Obat berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async nonaktifkan(req, res) {
    try {
      await ObatService.nonaktifkan(req.user.id, req.params.id);
      berhasil(res, null, 'Obat berhasil dinonaktifkan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async logMinum(req, res) {
    try {
      await ObatService.tambahLogMinum(req.user.id, req.params.id, req.body);
      berhasil(res, null, 'Log minum obat berhasil dicatat', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async statistikKepatuhan(req, res) {
    try {
      const data = await ObatService.ambilStatistikKepatuhan(req.user.id, req.params.id);
      berhasil(res, data, 'Statistik kepatuhan obat berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  // Publik Endpoints
  async cariObat(req, res) {
    try {
      const data = await ObatService.cariObat(req.query.q || '');
      berhasil(res, data, 'Hasil pencarian obat');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async cariBarcode(req, res) {
    try {
      const data = await ObatService.cariBarcode(req.params.kode);
      berhasil(res, data, 'Hasil scan barcode obat');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async cekInteraksi(req, res) {
    try {
      const { obat } = req.query; // Expecting array or comma-separated
      const data = await ObatService.cekInteraksi(obat);
      berhasil(res, data, 'Hasil cek interaksi obat');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new ObatController();
