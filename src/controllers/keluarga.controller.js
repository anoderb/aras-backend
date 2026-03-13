const KeluargaService = require('../services/keluarga.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class KeluargaController {
  async daftarAnggota(req, res) {
    try {
      const data = await KeluargaService.getKeluarga(req.user.id);
      return res.status(200).json(berhasil('Daftar keluarga berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async tambahAnggota(req, res) {
    try {
      await KeluargaService.tambahAnggota(req.user.id, req.body);
      return res.status(201).json(berhasil('Anggota keluarga berhasil ditambahkan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async detailAnggota(req, res) {
    try {
      const data = await KeluargaService.getDetail(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Detail anggota keluarga berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async updateAnggota(req, res) {
    try {
      const data = await KeluargaService.updateAnggota(req.user.id, req.params.id, req.body);
      return res.status(200).json(berhasil('Data anggota keluarga berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapusAnggota(req, res) {
    try {
      await KeluargaService.hapusAnggota(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Anggota keluarga berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async dataKesehatan(req, res) {
    try {
      const data = await KeluargaService.getKesehatan(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Data kesehatan anggota keluarga berhasil diambil', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new KeluargaController();
