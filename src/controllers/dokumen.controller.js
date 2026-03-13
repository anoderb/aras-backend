const DokumenService = require('../services/dokumen.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class DokumenController {
  async daftar(req, res) {
    try {
      const { halaman, per_halaman, jenis } = req.query;
      const filter = { jenis };
      const { data, meta } = await DokumenService.daftar(req.user.id, filter, halaman, per_halaman);
      berhasil(res, data, 'Daftar dokumen berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async upload(req, res) {
    try {
      const id = await DokumenService.upload(req.user.id, req.body, req.file);
      berhasil(res, { id }, 'Dokumen berhasil diunggah', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async detail(req, res) {
    try {
      const data = await DokumenService.detail(req.user.id, req.params.id);
      berhasil(res, data, 'Detail dokumen berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async update(req, res) {
    try {
      const data = await DokumenService.update(req.user.id, req.params.id, req.body);
      berhasil(res, data, 'Data dokumen berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapus(req, res) {
    try {
      await DokumenService.hapus(req.user.id, req.params.id);
      berhasil(res, null, 'Dokumen berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async bagikan(req, res) {
    try {
      const { dokter_id } = req.params;
      const data = await DokumenService.bagikan(req.user.id, req.params.id, dokter_id);
      berhasil(res, data, 'Dokumen berhasil dibagikan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async filterHasilLab(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await DokumenService.daftar(req.user.id, { jenis: 'hasil_lab' }, halaman, per_halaman);
      berhasil(res, data, 'Filter hasil lab berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async filterResep(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await DokumenService.daftar(req.user.id, { jenis: 'resep' }, halaman, per_halaman);
      berhasil(res, data, 'Filter resep berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new DokumenController();
