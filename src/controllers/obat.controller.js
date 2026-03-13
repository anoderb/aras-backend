const ObatService = require('../services/obat.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class ObatController {
  async daftarAktif(req, res) {
    try {
      const data = await ObatService.daftarAktif(req.user.id);
      return res.status(200).json(berhasil('Daftar obat aktif berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async tambah(req, res) {
    try {
      const id = await ObatService.tambah(req.user.id, req.body);
      return res.status(201).json(berhasil('Obat berhasil ditambahkan', { id }));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async riwayat(req, res) {
    try {
      const { halaman, per_halaman } = req.query;
      const { data, meta } = await ObatService.riwayat(req.user.id, halaman, per_halaman);
      return res.status(200).json({ status: true, kode: 200, pesan: 'Riwayat obat berhasil diambil', data, meta });
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async detail(req, res) {
    try {
      const data = await ObatService.detail(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Detail obat berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async update(req, res) {
    try {
      const data = await ObatService.update(req.user.id, req.params.id, req.body);
      return res.status(200).json(berhasil('Data obat berhasil diperbarui', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async hapus(req, res) {
    try {
      await ObatService.hapus(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Obat berhasil dihapus'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async nonaktifkan(req, res) {
    try {
      await ObatService.nonaktifkan(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Obat berhasil dinonaktifkan'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async logMinum(req, res) {
    try {
      await ObatService.logMinum(req.user.id, req.params.id, req.body);
      return res.status(201).json(berhasil('Log minum obat berhasil dicatat'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async statistikKepatuhan(req, res) {
    try {
      const data = await ObatService.statistikKepatuhan(req.user.id, req.params.id);
      return res.status(200).json(berhasil('Statistik kepatuhan obat berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  // Publik Endpoints
  async cariObat(req, res) {
    try {
      const data = await ObatService.cariObat(req.query.q || '');
      return res.status(200).json(berhasil('Hasil pencarian obat', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async cariBarcode(req, res) {
    try {
      const data = await ObatService.cariBarcode(req.params.kode);
      return res.status(200).json(berhasil('Hasil scan barcode obat', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async cekInteraksi(req, res) {
    try {
      const { obat } = req.query; // Expecting array or comma-separated
      const data = await ObatService.cekInteraksi(obat);
      return res.status(200).json(berhasil('Hasil cek interaksi obat', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new ObatController();
