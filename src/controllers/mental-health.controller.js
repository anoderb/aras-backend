const MentalHealthService = require('../services/mental-health.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class MentalHealthController {
  async soalSkrining(req, res) {
    try {
      const { tipe } = req.query;
      const data = await MentalHealthService.getScreeningQuestions(tipe || 'phq-9');
      berhasil(res, data, 'Soal skrining berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async simpanHasil(req, res) {
    try {
      const { tipe, jawaban } = req.body;
      if (!tipe || !jawaban) throw new Error('Tipe dan jawaban wajib diisi');
      
      const data = await MentalHealthService.hitungSkor(req.user.id, tipe, jawaban);
      berhasil(res, data, 'Hasil skrining berhasil diproses');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async statistikMood(req, res) {
    try {
      const data = await MentalHealthService.analisisMood(req.user.id);
      berhasil(res, data, 'Statistik mood berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }
}

module.exports = new MentalHealthController();
