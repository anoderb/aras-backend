const ArtikelService = require('../services/artikel.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class ArtikelController {
  // Publik
  async feed(req, res) {
    try {
      const { q, kategori, halaman, per_halaman } = req.query;
      const { data, meta } = await ArtikelService.daftarArtikel({ q, kategori }, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Daftar artikel berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async populer(req, res) {
    try {
      const { limit } = req.query;
      const data = await ArtikelService.artikelPopuler(limit);
      return res.status(200).json(berhasil('Artikel populer berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await ArtikelService.detailArtikel(req.params.id);
      return res.status(200).json(berhasil('Detail artikel berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  // User
  async simpan(req, res) {
    try {
      await ArtikelService.simpanArtikel(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Artikel berhasil disimpan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapusSimpan(req, res) {
    try {
      await ArtikelService.hapusSimpan(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Artikel berhasil dihapus dari simpanan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async tersimpan(req, res) {
    try {
      const data = await ArtikelService.artikelTersimpan(req.user.id);
      return res.status(200).json(berhasil('Daftar artikel tersimpan berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  // Dokter
  async saya(req, res) {
    try {
      const data = await ArtikelService.artikelSaya(req.user.id);
      return res.status(200).json(berhasil('Daftar artikel saya berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async buat(req, res) {
    try {
      const data = await ArtikelService.buatArtikel(req.user.id, req.body);
      return res.status(201).json(berhasil('Artikel berhasil dibuat', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async update(req, res) {
    try {
      const data = await ArtikelService.updateArtikel(req.params.id, req.user.id, req.body);
      return res.status(200).json(berhasil('Artikel berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapus(req, res) {
    try {
      await ArtikelService.hapusArtikel(req.params.id, req.user.id);
      return res.status(200).json(berhasil('Artikel berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new ArtikelController();
