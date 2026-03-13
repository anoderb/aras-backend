const ProgramService = require('../services/program.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class ProgramController {
  // USER
  async programSaya(req, res) {
    try {
      const data = await ProgramService.daftarProgramUser(req.user.id);
      return res.status(200).json(berhasil('Daftar program berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async detailProgram(req, res) {
    try {
      const data = await ProgramService.detailProgram(req.params.id, req.user.id, req.user.peran);
      return res.status(200).json(berhasil('Detail program berhasil diambil', data));
    } catch (error) {
      return res.status(404).json(gagal(error.message));
    }
  }

  async tugasHariIni(req, res) {
    try {
      const data = await ProgramService.getTugasHariIni(req.params.id, req.user.id);
      return res.status(200).json(berhasil('Tugas hari ini berhasil diambil', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async updateProgres(req, res) {
    try {
      await ProgramService.updateProgresTugas(req.params.tugas_id, req.user.id, req.body);
      return res.status(200).json(berhasil('Progres tugas berhasil diperbarui'));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async progresKeseluruhan(req, res) {
    try {
      const data = await ProgramService.getProgresKeseluruhan(req.params.id, req.user.id);
      return res.status(200).json(berhasil('Progres keseluruhan program berhasil diambil', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  // DOKTER
  async daftarProgramDokter(req, res) {
    try {
      const data = await ProgramService.daftarProgramDokter(req.user.id);
      return res.status(200).json(berhasil('Daftar program yang dibuat berhasil diambil', data));
    } catch (error) {
      return res.status(500).json(gagal(error.message));
    }
  }

  async buatProgram(req, res) {
    try {
      const data = await ProgramService.buatProgram(req.user.id, req.body);
      return res.status(201).json(berhasil('Program kesehatan berhasil dibuat', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async tambahTugas(req, res) {
    try {
      const data = await ProgramService.tambahTugas(req.params.id, req.user.id, req.body);
      return res.status(201).json(berhasil('Tugas berhasil ditambahkan ke program', data));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }

  async progresPasien(req, res) {
    try {
      const data = await ProgramService.detailProgram(req.params.id, req.user.id, 'dokter');
      return res.status(200).json(berhasil('Progres pasien berhasil diambil', data.statistik));
    } catch (error) {
      return res.status(400).json(gagal(error.message));
    }
  }
}

module.exports = new ProgramController();
