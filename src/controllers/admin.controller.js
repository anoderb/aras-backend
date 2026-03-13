const AdminService = require('../services/admin.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class AdminController {
  async dashboard(req, res) {
    try {
      const data = await AdminService.getDashboard();
      berhasil(res, data, 'Data dashboard admin berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async daftarPengguna(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const data = await AdminService.daftarPengguna(halaman, per_halaman);
      berhasil(res, data.data, 'Daftar pengguna berhasil diambil', 200, data.meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async suspendAkun(req, res) {
    try {
      await AdminService.suspendAkun(req.params.id);
      berhasil(res, null, 'Akun berhasil di-suspend');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async aktifkanAkun(req, res) {
    try {
      await AdminService.aktifkanAkun(req.params.id);
      berhasil(res, null, 'Akun berhasil diaktifkan kembali');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async antrianVerifikasi(req, res) {
    try {
      const data = await AdminService.antrianVerifikasi();
      berhasil(res, data, 'Antrian verifikasi dokter berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async setujui(req, res) {
    try {
      await AdminService.prosesVerifikasi(req.params.id, 'terverifikasi', req.user.id);
      berhasil(res, null, 'Dokter berhasil diverifikasi');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async tolak(req, res) {
    try {
      await AdminService.prosesVerifikasi(req.params.id, 'ditolak', req.user.id);
      berhasil(res, null, 'Verifikasi dokter ditolak');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async daftarLaporan(req, res) {
    try {
      const data = await AdminService.daftarLaporan();
      berhasil(res, data, 'Daftar laporan konten berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async tindakLaporan(req, res) {
    try {
      const { tindakan } = req.body; // 'dihapus' | 'diabaikan'
      await AdminService.tindakLaporan(req.params.id, tindakan, req.user.id);
      berhasil(res, null, 'Laporan konten berhasil ditindaklanjui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new AdminController();
