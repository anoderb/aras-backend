const ArtikelService = require('../services/artikel.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class ArtikelController {
  // Publik
  async feed(req, res) {
    try {
      const { q, kategori, halaman, per_halaman } = req.query;
      const { data, meta } = await ArtikelService.daftarArtikel({ q, kategori }, halaman, per_halaman);
      berhasil(res, data, 'Daftar artikel berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async populer(req, res) {
    try {
      const { limit } = req.query;
      const data = await ArtikelService.artikelPopuler(limit);
      berhasil(res, data, 'Artikel populer berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async detail(req, res) {
    try {
      const data = await ArtikelService.detailArtikel(req.params.id);
      berhasil(res, data, 'Detail artikel berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  // User
  async simpan(req, res) {
    try {
      await ArtikelService.simpanArtikel(req.user.id, req.params.id);
      berhasil(res, null, 'Artikel berhasil disimpan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapusSimpan(req, res) {
    try {
      await ArtikelService.hapusSimpan(req.user.id, req.params.id);
      berhasil(res, null, 'Artikel berhasil dihapus dari simpanan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async tersimpan(req, res) {
    try {
      const data = await ArtikelService.artikelTersimpan(req.user.id);
      berhasil(res, data, 'Daftar artikel tersimpan berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  // Dokter
  async saya(req, res) {
    try {
      const data = await ArtikelService.artikelSaya(req.user.id);
      berhasil(res, data, 'Daftar artikel saya berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async buat(req, res) {
    try {
      const data = await ArtikelService.buatArtikel(req.user.id, req.body);
      berhasil(res, data, 'Artikel berhasil dibuat', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async update(req, res) {
    try {
      const data = await ArtikelService.updateArtikel(req.params.id, req.user.id, req.body);
      berhasil(res, data, 'Artikel berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapus(req, res) {
    try {
      await ArtikelService.hapusArtikel(req.params.id, req.user.id);
      berhasil(res, null, 'Artikel berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new ArtikelController();
