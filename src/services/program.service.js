const ProgramRepository = require('../repositories/program.repository');
const DokterRepository = require('../repositories/dokter.repository');

class ProgramService {
  async buatProgram(penggunaId, payload) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    if (!profilDokter) throw new Error('Hanya dokter yang dapat membuat program');

    const data = { ...payload, dokter_id: profilDokter.id };
    const id = await ProgramRepository.createProgram(data);
    return await ProgramRepository.findProgramById(id);
  }

  async detailProgram(id, penggunaId, peran) {
    const program = await ProgramRepository.findProgramById(id);
    if (!program) throw new Error('Program tidak ditemukan');

    // Auth Check
    if (peran === 'user' && program.pengguna_id !== penggunaId) throw new Error('Akses ditolak');
    
    if (peran === 'dokter') {
      const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
      if (program.dokter_id !== profilDokter.id) throw new Error('Akses ditolak');
    }

    const tugas = await ProgramRepository.findTugasByProgramId(id);
    const statistik = await ProgramRepository.getProgresStatistik(id);

    return { ...program, statistik, tugas };
  }

  async daftarProgramUser(penggunaId) {
    return await ProgramRepository.findAllProgramsByUser(penggunaId);
  }

  async daftarProgramDokter(penggunaId) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    if (!profilDokter) throw new Error('Profil dokter tidak ditemukan');
    return await ProgramRepository.findAllProgramsByDokter(profilDokter.id);
  }

  async tambahTugas(programId, penggunaId, payload) {
    const program = await ProgramRepository.findProgramById(programId);
    if (!program) throw new Error('Program tidak ditemukan');
    
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    if (program.dokter_id !== profilDokter.id) throw new Error('Akses ditolak');

    await ProgramRepository.createTugas({ ...payload, program_id: programId });
    return await ProgramRepository.findTugasByProgramId(programId);
  }

  async getTugasHariIni(programId, penggunaId) {
    const program = await ProgramRepository.findProgramById(programId);
    if (!program || program.pengguna_id !== penggunaId) throw new Error('Akses ditolak');

    // Hitung hari ke berapa
    const tglMulai = new Date(program.tgl_mulai);
    const tglSekarang = new Date();
    const diffTime = Math.abs(tglSekarang - tglMulai);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    const hariKe = diffDays <= 0 ? 1 : diffDays;

    return await ProgramRepository.findTugasHariIni(programId, hariKe);
  }

  async updateProgresTugas(tugasId, penggunaId, payload) {
    await ProgramRepository.updateProgres(tugasId, penggunaId, payload);
    return true;
  }

  async getProgresKeseluruhan(id, penggunaId) {
    const program = await ProgramRepository.findProgramById(id);
    if (!program || program.pengguna_id !== penggunaId) throw new Error('Akses ditolak');
    
    return await ProgramRepository.getProgresStatistik(id);
  }
}

module.exports = new ProgramService();
