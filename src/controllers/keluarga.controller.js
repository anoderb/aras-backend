const KeluargaService = require('../services/keluarga.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class KeluargaController {
  async daftarAnggota(req, res) {
    try {
      const data = await KeluargaService.getKeluarga(req.user.id);
      berhasil(res, data, 'Daftar keluarga berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async tambahAnggota(req, res) {
    try {
      await KeluargaService.tambahAnggota(req.user.id, req.body);
      berhasil(res, null, 'Anggota keluarga berhasil ditambahkan', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async detailAnggota(req, res) {
    try {
      const data = await KeluargaService.getDetail(req.user.id, req.params.id);
      berhasil(res, data, 'Detail anggota keluarga berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async updateAnggota(req, res) {
    try {
      const data = await KeluargaService.updateAnggota(req.user.id, req.params.id, req.body);
      berhasil(res, data, 'Data anggota keluarga berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async hapusAnggota(req, res) {
    try {
      await KeluargaService.hapusAnggota(req.user.id, req.params.id);
      berhasil(res, null, 'Anggota keluarga berhasil dihapus');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async dataKesehatan(req, res) {
    try {
      const data = await KeluargaService.getKesehatan(req.user.id, req.params.id);
      berhasil(res, data, 'Data kesehatan anggota keluarga berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new KeluargaController();
