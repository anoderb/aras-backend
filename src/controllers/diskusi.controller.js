const DiskusiService = require('../services/diskusi.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class DiskusiController {
  // Publik & Feed
  async feed(req, res) {
    try {
      const { kategori, halaman, per_halaman } = req.query;
      const { data, meta } = await DiskusiService.feedDiskusi({ kategori }, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Feed diskusi berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await DiskusiService.detailPost(req.params.id);
      return res.status(200).json(berhasil('Detail postingan berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  // Post Actions (Auth required)
  async buat(req, res) {
    try {
      const data = await DiskusiService.buatPost(req.user.id, req.body);
      return res.status(201).json(berhasil('Postingan berhasil dibuat', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async edit(req, res) {
    try {
      const data = await DiskusiService.editPost(req.params.id, req.user.id, req.body);
      return res.status(200).json(berhasil('Postingan berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapus(req, res) {
    try {
      await DiskusiService.hapusPost(req.params.id, req.user.id, req.user.peran);
      return res.status(200).json(berhasil('Postingan berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  // Interaksi
  async sukaPost(req, res) {
    try {
      const resData = await DiskusiService.sukaKonten(req.user.id, 'postingan', req.params.id);
      return res.status(200).json(berhasil(resData.liked ? 'Menyukai postingan' : 'Batal menyukai postingan', resData));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async laporPost(req, res) {
    try {
      await DiskusiService.laporkanKonten(req.user.id, 'postingan', req.params.id, req.body);
      return res.status(200).json(berhasil('Laporan postingan berhasil dikirim'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  // Komentar
  async tambahKomentar(req, res) {
    try {
      const id = await DiskusiService.tambahKomentar(req.params.id, req.user.id, req.user.peran, req.body);
      return res.status(201).json(berhasil('Komentar berhasil ditambahkan', { id }));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapusKomentar(req, res) {
    try {
      await DiskusiService.hapusKomentar(req.params.komentar_id, req.user.id, req.user.peran);
      return res.status(200).json(berhasil('Komentar berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  // Moderasi Dokter
  async pinKoreksi(req, res) {
    try {
      await DiskusiService.pinKoreksi(req.params.id, req.user.id);
      return res.status(200).json(berhasil('Postingan berhasil dipin sebagai koreksi'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async sembunyikanPost(req, res) {
    try {
      await DiskusiService.sembunyikanPost(req.params.id);
      return res.status(200).json(berhasil('Postingan berhasil disembunyikan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new DiskusiController();
