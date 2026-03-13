const SOSService = require('../services/sos.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class SOSController {
  async aktifkan(req, res) {
    try {
      const { lat, lng } = req.body;
      const data = await SOSService.aktifkanSOS(req.user.id, lat, lng);
      berhasil(res, data, 'Mode darurat SOS diaktifkan!');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async rsTerdekat(req, res) {
    try {
      const { lat, lng } = req.query;
      const data = await SOSService.rsTerdekat(lat, lng);
      berhasil(res, data, 'Daftar RS terdekat saat darurat berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async notifKontak(req, res) {
    try {
      const data = await SOSService.notifKontakDarurat(req.user.id);
      berhasil(res, data, 'Notifikasi ke kontak darurat berhasil dikirim');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async ringkasan(req, res) {
    try {
      const data = await SOSService.ringkasanKesehatan(req.user.id);
      berhasil(res, data, 'Ringkasan data darurat berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async nonaktifkan(req, res) {
    try {
      const data = await SOSService.nonaktifkanSOS(req.user.id);
      berhasil(res, data, 'Mode darurat SOS dimatikan');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new SOSController();
