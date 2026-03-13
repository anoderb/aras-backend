const AktivitasService = require('../services/aktivitas.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class AktivitasController {
  async riwayat(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await AktivitasService.riwayat(req.user.id, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Riwayat aktivitas berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async tambah(req, res) {
    try {
      await AktivitasService.tambah(req.user.id, req.body);
      return res.status(201).json(berhasil('Log aktivitas berhasil disimpan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await AktivitasService.detail(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Detail aktivitas berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async update(req, res) {
    try {
      const data = await AktivitasService.update(req.user.id, req.params.id, req.body);
      return res.status(200).json(berhasil('Log aktivitas berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapus(req, res) {
    try {
      await AktivitasService.hapus(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Log aktivitas berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async ringkasan(req, res) {
    try {
      const data = await AktivitasService.ringkasan(req.user.id);
      return res.status(200).json(berhasil('Ringkasan aktivitas harian berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new AktivitasController();
