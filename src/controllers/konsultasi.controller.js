const KonsultasiService = require('../services/konsultasi.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class KonsultasiController {
  // USER
  async riwayat(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await KonsultasiService.riwayatUser(req.user.id, halaman, per_halaman);
      berhasil(res, data, 'Riwayat konsultasi berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async mulai(req, res) {
    try {
      const data = await KonsultasiService.mulaiKonsultasi(req.user.id, req.body);
      berhasil(res, data, 'Sesi konsultasi berhasil dibuat', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async detail(req, res) {
    try {
      const data = await KonsultasiService.detailKonsultasi(req.params.id, req.user.id, req.user.peran);
      berhasil(res, data, 'Detail konsultasi berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async selesai(req, res) {
    try {
      const data = await KonsultasiService.updateStatus(req.params.id, req.user.id, req.user.peran, 'selesai');
      berhasil(res, data, 'Konsultasi telah diselesaikan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async batalkan(req, res) {
    try {
      const data = await KonsultasiService.updateStatus(req.params.id, req.user.id, req.user.peran, 'dibatalkan');
      berhasil(res, data, 'Konsultasi telah dibatalkan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async beriRating(req, res) {
    try {
      await KonsultasiService.beriRating(req.params.id, req.user.id, req.body);
      berhasil(res, null, 'Rating berhasil diberikan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  // PESAN
  async ambilPesan(req, res) {
    try {
      const data = await KonsultasiService.ambilPesan(req.params.id, req.user.id, req.user.peran);
      berhasil(res, data, 'Daftar pesan berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async kirimPesan(req, res) {
    try {
      const payload = {
        isi_pesan: req.body.isi_pesan,
        tipe_pesan: req.body.tipe_pesan || 'teks',
        url_file: req.body.url_file
      };
      const data = await KonsultasiService.kirimPesan(req.params.id, req.user.id, req.user.peran, payload);
      berhasil(res, data, 'Pesan terkirim', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async tandaiBaca(req, res) {
    try {
      await KonsultasiService.ambilPesan(req.params.id, req.user.id, req.user.peran); // reuse logic
      berhasil(res, null, 'Semua pesan ditandai telah dibaca');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  // DOKTER
  async konsultasiAktif(req, res) {
    try {
      const { data, meta } = await KonsultasiService.riwayatDokter(req.user.id, 'aktif', req.query.halaman, req.query.per_halaman);
      berhasil(res, data, 'Konsultasi aktif berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async antrian(req, res) {
    try {
      const { data, meta } = await KonsultasiService.riwayatDokter(req.user.id, 'menunggu', req.query.halaman, req.query.per_halaman);
      berhasil(res, data, 'Antrian konsultasi berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async terima(req, res) {
    try {
      const data = await KonsultasiService.updateStatus(req.params.id, req.user.id, req.user.peran, 'aktif');
      berhasil(res, data, 'Konsultasi diterima');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async tambahCatatan(req, res) {
    try {
      const { catatan_dokter, resep } = req.body;
      const data = await KonsultasiService.updateStatus(req.params.id, req.user.id, req.user.peran, req.user.peran === 'dokter' ? null : 'selesai', { catatan_dokter, resep });
      berhasil(res, data, 'Catatan dokter berhasil ditambahkan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new KonsultasiController();
