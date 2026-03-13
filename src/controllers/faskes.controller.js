const FaskesService = require('../services/faskes.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class FaskesController {
  async terdekat(req, res) {
    try {
      const { lat, lng, radius } = req.query;
      if (!lat || !lng) throw new Error('Koordinat (lat, lng) wajib diisi');
      
      const data = await FaskesService.faskesTerdekat(lat, lng, radius);
      return res.status(200).json(berhasil('Daftar faskes terdekat berhasil diambil', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async cari(req, res) {
    try {
      const { q, lat, lng } = req.query;
      if (!q) throw new Error('Keyword pencarian (q) wajib diisi');
      
      const data = await FaskesService.cariFaskes(q, lat || -6.200000, lng || 106.816666); // Default Jakarta jika lat/lng kosong
      return res.status(200).json(berhasil('Hasil pencarian faskes berhasil diambil', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async geocode(req, res) {
    try {
      const { alamat } = req.query;
      const data = await FaskesService.geocode(alamat);
      return res.status(200).json(berhasil('Geocoding berhasil', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async reverse(req, res) {
    try {
      const { lat, lng } = req.query;
      const data = await FaskesService.reverseGeocode(lat, lng);
      return res.status(200).json(berhasil('Reverse geocoding berhasil', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new FaskesController();
