const DokumenService = require('../services/dokumen.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class DokumenController {
  async daftar(req, res) {
    try {
      const { halaman, per_halaman, jenis } = req.query;
      const filter = { jenis };
      const { data, meta } = await DokumenService.daftar(req.user.id, filter, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Daftar dokumen berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async upload(req, res) {
    try {
      const id = await DokumenService.upload(req.user.id, req.body, req.file);
      return res.status(201).json(berhasil('Dokumen berhasil diunggah', { id }));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await DokumenService.detail(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Detail dokumen berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async update(req, res) {
    try {
      const data = await DokumenService.update(req.user.id, req.params.id, req.body);
      return res.status(200).json(berhasil('Data dokumen berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapus(req, res) {
    try {
      await DokumenService.hapus(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Dokumen berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async bagikan(req, res) {
    try {
      const { dokter_id } = req.params;
      const data = await DokumenService.bagikan(req.user.id, req.params.id, dokter_id);
      return res.status(200).json(berhasil('Dokumen berhasil dibagikan', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async filterHasilLab(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await DokumenService.daftar(req.user.id, { jenis: 'hasil_lab' }, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Filter hasil lab berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async filterResep(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await DokumenService.daftar(req.user.id, { jenis: 'resep' }, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Filter resep berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new DokumenController();
