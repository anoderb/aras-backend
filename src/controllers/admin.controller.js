const AdminService = require('../services/admin.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class AdminController {
  async dashboard(req, res) {
    try {
      const data = await AdminService.getDashboard();
      return res.status(200).json(berhasil('Data dashboard admin berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async daftarPengguna(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const data = await AdminService.daftarPengguna(halaman, per_halaman);
      return res.status(200).json(berhasil('Daftar pengguna berhasil diambil', data.data, data.meta));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async suspendAkun(req, res) {
    try {
      await AdminService.suspendAkun(req.params.id);
      return res.status(200).json(berhasil('Akun berhasil di-suspend'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async aktifkanAkun(req, res) {
    try {
      await AdminService.aktifkanAkun(req.params.id);
      return res.status(200).json(berhasil('Akun berhasil diaktifkan kembali'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async antrianVerifikasi(req, res) {
    try {
      const data = await AdminService.antrianVerifikasi();
      return res.status(200).json(berhasil('Antrian verifikasi dokter berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async setujui(req, res) {
    try {
      await AdminService.prosesVerifikasi(req.params.id, 'terverifikasi', req.user.id);
      return res.status(200).json(berhasil('Dokter berhasil diverifikasi'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async tolak(req, res) {
    try {
      await AdminService.prosesVerifikasi(req.params.id, 'ditolak', req.user.id);
      return res.status(200).json(berhasil('Verifikasi dokter ditolak'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async daftarLaporan(req, res) {
    try {
      const data = await AdminService.daftarLaporan();
      return res.status(200).json(berhasil('Daftar laporan konten berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async tindakLaporan(req, res) {
    try {
      const { tindakan } = req.body; // 'dihapus' | 'diabaikan'
      await AdminService.tindakLaporan(req.params.id, tindakan, req.user.id);
      return res.status(200).json(berhasil('Laporan konten berhasil ditindaklanjui'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new AdminController();
