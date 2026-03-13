const ForumService = require('../services/forum.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class ForumController {
  // Publik & Global
  async daftar(req, res) {
    try {
      const { q, kategori, status, halaman, per_halaman } = req.query;
      const { data, meta } = await ForumService.daftarPertanyaan({ q, kategori, status }, halaman, per_halaman);
      berhasil(res, data, 'Daftar pertanyaan berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async detail(req, res) {
    try {
      const data = await ForumService.detailPertanyaan(req.params.id);
      berhasil(res, data, 'Detail pertanyaan berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  // Pertanyaan Actions (Auth required)
  async buat(req, res) {
    try {
      const data = await ForumService.buatPertanyaan(req.user.id, req.body);
      berhasil(res, data, 'Pertanyaan berhasil dibuat', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async edit(req, res) {
    try {
      const data = await ForumService.editPertanyaan(req.params.id, req.user.id, req.body);
      berhasil(res, data, 'Pertanyaan berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapus(req, res) {
    try {
      await ForumService.hapusPertanyaan(req.params.id, req.user.id, req.user.peran);
      berhasil(res, null, 'Pertanyaan berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  // Jawaban
  async tambahJawaban(req, res) {
    try {
      const id = await ForumService.tambahJawaban(req.params.id, req.user.id, req.user.peran, req.body);
      berhasil(res, { id }, 'Jawaban berhasil ditambahkan', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapusJawaban(req, res) {
    try {
      await ForumService.hapusJawaban(req.params.jawaban_id, req.user.id, req.user.peran);
      berhasil(res, null, 'Jawaban berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async setTerbaik(req, res) {
    try {
      await ForumService.tandaiJawabanTerbaik(req.params.id, req.params.jawaban_id, req.user.id);
      berhasil(res, null, 'Jawaban berhasil ditandai sebagai yang terbaik');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async sukaJawaban(req, res) {
    try {
      const resData = await ForumService.sukJawaban(req.user.id, req.params.jawaban_id);
      berhasil(res, resData, resData.liked ? 'Menyukai jawaban' : 'Batal menyukai jawaban');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new ForumController();
