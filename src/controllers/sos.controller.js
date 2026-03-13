const SOSService = require('../services/sos.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class SOSController {
  async aktifkan(req, res) {
    try {
      const { lat, lng } = req.body;
      const data = await SOSService.aktifkanSOS(req.user.id, lat, lng);
      return res.status(200).json(berhasil('Mode darurat SOS diaktifkan!', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async rsTerdekat(req, res) {
    try {
      const { lat, lng } = req.query;
      const data = await SOSService.rsTerdekat(lat, lng);
      return res.status(200).json(berhasil('Daftar RS terdekat saat darurat berhasil diambil', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async notifKontak(req, res) {
    try {
      const data = await SOSService.notifKontakDarurat(req.user.id);
      return res.status(200).json(berhasil('Notifikasi ke kontak darurat berhasil dikirim', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async ringkasan(req, res) {
    try {
      const data = await SOSService.ringkasanKesehatan(req.user.id);
      return res.status(200).json(berhasil('Ringkasan data darurat berhasil diambil', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async nonaktifkan(req, res) {
    try {
      const data = await SOSService.nonaktifkanSOS(req.user.id);
      return res.status(200).json(berhasil('Mode darurat SOS dimatikan', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new SOSController();
