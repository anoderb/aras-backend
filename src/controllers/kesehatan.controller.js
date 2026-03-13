const KesehatanService = require('../services/kesehatan.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class KesehatanController {
  async riwayat(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await KesehatanService.riwayat(req.user.id, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Riwayat kesehatan berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async tambah(req, res) {
    try {
      await KesehatanService.tambah(req.user.id, req.body);
      return res.status(201).json(berhasil('Catatan kesehatan berhasil disimpan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await KesehatanService.detail(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Detail catatan kesehatan berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async update(req, res) {
    try {
      const data = await KesehatanService.update(req.user.id, req.params.id, req.body);
      return res.status(200).json(berhasil('Catatan kesehatan berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapus(req, res) {
    try {
      await KesehatanService.hapus(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Catatan kesehatan berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async grafik(req, res) {
    try {
      const rentang = req.query.rentang || 'minggu';
      const data = await KesehatanService.grafik(req.user.id, rentang);
      return res.status(200).json(berhasil('Grafik kesehatan berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async ringkasan(req, res) {
    try {
      const rentang = req.query.rentang || 'minggu';
      const data = await KesehatanService.ringkasan(req.user.id, rentang);
      return res.status(200).json(berhasil('Ringkasan kesehatan berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async ekspor(req, res) {
    try {
      const data = await KesehatanService.ekspor(req.user.id);
      return res.status(200).json(berhasil('Berhasil mengenerate laporan kesehatan', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new KesehatanController();
