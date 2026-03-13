const DokterService = require('../services/dokter.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class DokterController {
  // Publik
  async daftarDokter(req, res) {
    try {
      const { q, spesialisasi, halaman, per_halaman } = req.query;
      const { data, meta } = await DokterService.daftarDokter({ q, spesialisasi }, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Daftar dokter berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async profilPublik(req, res) {
    try {
      const data = await DokterService.detailDokter(req.params.id);
      return res.status(200).json(berhasil('Profil dokter berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async daftarSpesialisasi(req, res) {
    try {
      const data = await DokterService.daftarSpesialisasi();
      return res.status(200).json(berhasil('Daftar spesialisasi berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async dokterTerdekat(req, res) {
    try {
      const { lat, lng } = req.query;
      const data = await DokterService.dokterTerdekat(lat, lng);
      return res.status(200).json(berhasil('Daftar dokter terdekat berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  // Dokter
  async lihatProfil(req, res) {
    try {
      const data = await DokterService.lihatProfilSendiri(req.user.id);
      return res.status(200).json(berhasil('Profil dokter berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async updateProfil(req, res) {
    try {
      const data = await DokterService.updateProfil(req.user.id, req.body);
      return res.status(200).json(berhasil('Profil dokter berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async setKetersediaan(req, res) {
    try {
      const { status_online } = req.body;
      await DokterService.setKetersediaan(req.user.id, status_online);
      return res.status(200).json(berhasil(`Status ketersediaan berhasil diubah menjadi ${status_online ? 'Online' : 'Offline'}`));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async statistik(req, res) {
    try {
      const data = await DokterService.statistik(req.user.id);
      return res.status(200).json(berhasil('Statistik praktis dokter berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  // Admin
  async antrianVerifikasi(req, res) {
    try {
      const data = await DokterService.antrianVerifikasi();
      return res.status(200).json(berhasil('Antrian verifikasi dokter berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async setujuiVerifikasi(req, res) {
    try {
      await DokterService.prosesVerifikasi(req.params.id, req.user.id, 'terverifikasi');
      return res.status(200).json(berhasil('Verifikasi dokter berhasil disetujui'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async tolakVerifikasi(req, res) {
    try {
      await DokterService.prosesVerifikasi(req.params.id, req.user.id, 'ditolak');
      return res.status(200).json(berhasil('Verifikasi dokter telah ditolak'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new DokterController();
