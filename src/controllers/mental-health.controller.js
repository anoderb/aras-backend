const MentalHealthService = require('../services/mental-health.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class MentalHealthController {
  async soalSkrining(req, res) {
    try {
      const { tipe } = req.query;
      const data = await MentalHealthService.getScreeningQuestions(tipe || 'phq-9');
      return res.status(200).json(berhasil('Soal skrining berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async simpanHasil(req, res) {
    try {
      const { tipe, jawaban } = req.body;
      if (!tipe || !jawaban) throw new Error('Tipe dan jawaban wajib diisi');
      
      const data = await MentalHealthService.hitungSkor(req.user.id, tipe, jawaban);
      return res.status(200).json(berhasil('Hasil skrining berhasil diproses', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async statistikMood(req, res) {
    try {
      const data = await MentalHealthService.analisisMood(req.user.id);
      return res.status(200).json(berhasil('Statistik mood berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }
}

module.exports = new MentalHealthController();
