const DokterService = require('../services/dokter.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class DokterController {
  // Publik
  async daftarDokter(req, res) {
    try {
      const { q, spesialisasi, halaman, per_halaman } = req.query;
      const { data, meta } = await DokterService.daftarDokter({ q, spesialisasi }, halaman, per_halaman);
      berhasil(res, data, 'Daftar dokter berhasil diambil', 200, meta);
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async profilPublik(req, res) {
    try {
      const data = await DokterService.detailDokter(req.params.id);
      berhasil(res, data, 'Profil dokter berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async daftarSpesialisasi(req, res) {
    try {
      const data = await DokterService.daftarSpesialisasi();
      berhasil(res, data, 'Daftar spesialisasi berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async dokterTerdekat(req, res) {
    try {
      const { lat, lng } = req.query;
      const data = await DokterService.dokterTerdekat(lat, lng);
      berhasil(res, data, 'Daftar dokter terdekat berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  // Dokter
  async lihatProfil(req, res) {
    try {
      const data = await DokterService.lihatProfilSendiri(req.user.id);
      berhasil(res, data, 'Profil dokter berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async updateProfil(req, res) {
    try {
      const data = await DokterService.updateProfil(req.user.id, req.body);
      berhasil(res, data, 'Profil dokter berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async setKetersediaan(req, res) {
    try {
      const { status_online } = req.body;
      await DokterService.setKetersediaan(req.user.id, status_online);
      berhasil(res, null, `Status ketersediaan berhasil diubah menjadi ${status_online ? 'Online' : 'Offline'}`);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async statistik(req, res) {
    try {
      const data = await DokterService.statistik(req.user.id);
      berhasil(res, data, 'Statistik praktis dokter berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  // Admin
  async antrianVerifikasi(req, res) {
    try {
      const data = await DokterService.antrianVerifikasi();
      berhasil(res, data, 'Antrian verifikasi dokter berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async setujuiVerifikasi(req, res) {
    try {
      await DokterService.prosesVerifikasi(req.params.id, req.user.id, 'terverifikasi');
      berhasil(res, null, 'Verifikasi dokter berhasil disetujui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async tolakVerifikasi(req, res) {
    try {
      await DokterService.prosesVerifikasi(req.params.id, req.user.id, 'ditolak');
      berhasil(res, null, 'Verifikasi dokter telah ditolak');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new DokterController();
