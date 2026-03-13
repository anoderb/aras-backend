const DiskusiService = require('../services/diskusi.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class DiskusiController {
  // Publik & Feed
  async feed(req, res) {
    try {
      const { kategori, halaman, per_halaman } = req.query;
      const { data, meta } = await DiskusiService.feedDiskusi({ kategori }, halaman, per_halaman);
      berhasil(res, data, 'Feed diskusi berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async detail(req, res) {
    try {
      const data = await DiskusiService.detailPost(req.params.id);
      berhasil(res, data, 'Detail postingan berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  // Post Actions (Auth required)
  async buat(req, res) {
    try {
      const data = await DiskusiService.buatPost(req.user.id, req.body);
      berhasil(res, data, 'Postingan berhasil dibuat', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async edit(req, res) {
    try {
      const data = await DiskusiService.editPost(req.params.id, req.user.id, req.body);
      berhasil(res, data, 'Postingan berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapus(req, res) {
    try {
      await DiskusiService.hapusPost(req.params.id, req.user.id, req.user.peran);
      berhasil(res, null, 'Postingan berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  // Interaksi
  async sukaPost(req, res) {
    try {
      const resData = await DiskusiService.sukaKonten(req.user.id, 'postingan', req.params.id);
      berhasil(res, resData, resData.liked ? 'Menyukai postingan' : 'Batal menyukai postingan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async laporPost(req, res) {
    try {
      await DiskusiService.laporkanKonten(req.user.id, 'postingan', req.params.id, req.body);
      berhasil(res, null, 'Laporan postingan berhasil dikirim');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  // Komentar
  async tambahKomentar(req, res) {
    try {
      const id = await DiskusiService.tambahKomentar(req.params.id, req.user.id, req.user.peran, req.body);
      berhasil(res, { id }, 'Komentar berhasil ditambahkan', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapusKomentar(req, res) {
    try {
      await DiskusiService.hapusKomentar(req.params.komentar_id, req.user.id, req.user.peran);
      berhasil(res, null, 'Komentar berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  // Moderasi Dokter
  async pinKoreksi(req, res) {
    try {
      await DiskusiService.pinKoreksi(req.params.id, req.user.id);
      berhasil(res, null, 'Postingan berhasil dipin sebagai koreksi');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async sembunyikanPost(req, res) {
    try {
      await DiskusiService.sembunyikanPost(req.params.id);
      berhasil(res, null, 'Postingan berhasil disembunyikan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new DiskusiController();
