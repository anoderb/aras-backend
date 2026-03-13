const ProgramService = require('../services/program.service');
const { berhasil, gagal } = require('../helpers/response.helper');

class ProgramController {
  // USER
  async programSaya(req, res) {
    try {
      const data = await ProgramService.daftarProgramUser(req.user.id);
      berhasil(res, data, 'Daftar program berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async detailProgram(req, res) {
    try {
      const data = await ProgramService.detailProgram(req.params.id, req.user.id, req.user.peran);
      berhasil(res, data, 'Detail program berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 404);
    }
  }

  async tugasHariIni(req, res) {
    try {
      const data = await ProgramService.getTugasHariIni(req.params.id, req.user.id);
      berhasil(res, data, 'Tugas hari ini berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async updateProgres(req, res) {
    try {
      await ProgramService.updateProgresTugas(req.params.tugas_id, req.user.id, req.body);
      berhasil(res, null, 'Progres tugas berhasil diperbarui');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async progresKeseluruhan(req, res) {
    try {
      const data = await ProgramService.getProgresKeseluruhan(req.params.id, req.user.id);
      berhasil(res, data, 'Progres keseluruhan program berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  // DOKTER
  async daftarProgramDokter(req, res) {
    try {
      const data = await ProgramService.daftarProgramDokter(req.user.id);
      berhasil(res, data, 'Daftar program yang dibuat berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 500);
    }
  }

  async buatProgram(req, res) {
    try {
      const data = await ProgramService.buatProgram(req.user.id, req.body);
      berhasil(res, data, 'Program kesehatan berhasil dibuat', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async tambahTugas(req, res) {
    try {
      const data = await ProgramService.tambahTugas(req.params.id, req.user.id, req.body);
      berhasil(res, data, 'Tugas berhasil ditambahkan ke program', 201);
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }

  async progresPasien(req, res) {
    try {
      const data = await ProgramService.detailProgram(req.params.id, req.user.id, 'dokter');
      berhasil(res, data.statistik, 'Progres pasien berhasil diambil');
    } catch (error) {
      gagal(res, error.message, 400);
    }
  }
}

module.exports = new ProgramController();
