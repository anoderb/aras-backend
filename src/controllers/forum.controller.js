const ForumService = require('../services/forum.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class ForumController {
  // Publik & Global
  async daftar(req, res) {
    try {
      const { q, kategori, status, halaman, per_halaman } = req.query;
      const { data, meta } = await ForumService.daftarPertanyaan({ q, kategori, status }, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Daftar pertanyaan berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await ForumService.detailPertanyaan(req.params.id);
      return res.status(200).json(berhasil('Detail pertanyaan berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  // Pertanyaan Actions (Auth required)
  async buat(req, res) {
    try {
      const data = await ForumService.buatPertanyaan(req.user.id, req.body);
      return res.status(201).json(berhasil('Pertanyaan berhasil dibuat', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async edit(req, res) {
    try {
      const data = await ForumService.editPertanyaan(req.params.id, req.user.id, req.body);
      return res.status(200).json(berhasil('Pertanyaan berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapus(req, res) {
    try {
      await ForumService.hapusPertanyaan(req.params.id, req.user.id, req.user.peran);
      return res.status(200).json(berhasil('Pertanyaan berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  // Jawaban
  async tambahJawaban(req, res) {
    try {
      const id = await ForumService.tambahJawaban(req.params.id, req.user.id, req.user.peran, req.body);
      return res.status(201).json(berhasil('Jawaban berhasil ditambahkan', { id }));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapusJawaban(req, res) {
    try {
      await ForumService.hapusJawaban(req.params.jawaban_id, req.user.id, req.user.peran);
      return res.status(200).json(berhasil('Jawaban berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async setTerbaik(req, res) {
    try {
      await ForumService.tandaiJawabanTerbaik(req.params.id, req.params.jawaban_id, req.user.id);
      return res.status(200).json(berhasil('Jawaban berhasil ditandai sebagai yang terbaik'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async sukaJawaban(req, res) {
    try {
      const resData = await ForumService.sukJawaban(req.user.id, req.params.jawaban_id);
      return res.status(200).json(berhasil(resData.liked ? 'Menyukai jawaban' : 'Batal menyukai jawaban', resData));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new ForumController();
