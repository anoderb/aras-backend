const FaskesService = require('../services/faskes.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class FaskesController {
  async terdekat(req, res) {
    try {
      const { lat, lng, radius } = req.query;
      if (!lat || !lng) throw new Error('Koordinat (lat, lng) wajib diisi');
      
      const data = await FaskesService.faskesTerdekat(lat, lng, radius);
      berhasil(res, data, 'Daftar faskes terdekat berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async cari(req, res) {
    try {
      const { q, lat, lng } = req.query;
      if (!q) throw new Error('Keyword pencarian (q) wajib diisi');
      
      const data = await FaskesService.cariFaskes(q, lat || -6.200000, lng || 106.816666); // Default Jakarta jika lat/lng kosong
      berhasil(res, data, 'Hasil pencarian faskes berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async geocode(req, res) {
    try {
      const { alamat } = req.query;
      const data = await FaskesService.geocode(alamat);
      berhasil(res, data, 'Geocoding berhasil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async reverse(req, res) {
    try {
      const { lat, lng } = req.query;
      const data = await FaskesService.reverseGeocode(lat, lng);
      berhasil(res, data, 'Reverse geocoding berhasil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new FaskesController();
