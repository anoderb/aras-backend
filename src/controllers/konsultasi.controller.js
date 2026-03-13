const KonsultasiService = require('../services/konsultasi.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class KonsultasiController {
  // USER
  async riwayat(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await KonsultasiService.riwayatUser(req.user.id, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Riwayat konsultasi berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async mulai(req, res) {
    try {
      const data = await KonsultasiService.mulaiKonsultasi(req.user.id, req.body);
      return res.status(201).json(berhasil('Sesi konsultasi berhasil dibuat', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await KonsultasiService.detailKonsultasi(req.params.id, req.user.id, req.user.peran);
      return res.status(200).json(berhasil('Detail konsultasi berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async selesai(req, res) {
    try {
      const data = await KonsultasiService.updateStatus(req.params.id, req.user.id, req.user.peran, 'selesai');
      return res.status(200).json(berhasil('Konsultasi telah diselesaikan', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async batalkan(req, res) {
    try {
      const data = await KonsultasiService.updateStatus(req.params.id, req.user.id, req.user.peran, 'dibatalkan');
      return res.status(200).json(berhasil('Konsultasi telah dibatalkan', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async beriRating(req, res) {
    try {
      await KonsultasiService.beriRating(req.params.id, req.user.id, req.body);
      return res.status(200).json(berhasil('Rating berhasil diberikan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  // PESAN
  async ambilPesan(req, res) {
    try {
      const data = await KonsultasiService.ambilPesan(req.params.id, req.user.id, req.user.peran);
      return res.status(200).json(berhasil('Daftar pesan berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
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
      return res.status(201).json(berhasil('Pesan terkirim', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async tandaiBaca(req, res) {
    try {
      await KonsultasiService.ambilPesan(req.params.id, req.user.id, req.user.peran); // reuse logic
      return res.status(200).json(berhasil('Semua pesan ditandai telah dibaca'));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  // DOKTER
  async konsultasiAktif(req, res) {
    try {
      const { data, meta } = await KonsultasiService.riwayatDokter(req.user.id, 'aktif', req.query.halaman, req.query.per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Konsultasi aktif berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async antrian(req, res) {
    try {
      const { data, meta } = await KonsultasiService.riwayatDokter(req.user.id, 'menunggu', req.query.halaman, req.query.per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Antrian konsultasi berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async terima(req, res) {
    try {
      const data = await KonsultasiService.updateStatus(req.params.id, req.user.id, req.user.peran, 'aktif');
      return res.status(200).json(berhasil('Konsultasi diterima', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async tambahCatatan(req, res) {
    try {
      const { catatan_dokter, resep } = req.body;
      const data = await KonsultasiService.updateStatus(req.params.id, req.user.id, req.user.peran, req.user.peran === 'dokter' ? null : 'selesai', { catatan_dokter, resep });
      return res.status(200).json(berhasil('Catatan dokter berhasil ditambahkan', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new KonsultasiController();
