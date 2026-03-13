const AdminRepository = require('../repositories/admin.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class AdminService {
  async getDashboard() {
    return await AdminRepository.getDashboardStats();
  }

  async daftarPengguna(halaman, perHalaman) {
    const limit = parseInt(perHalaman) || 10;
    const offset = (parseInt(halaman) - 1) * limit || 0;
    
    const data = await AdminRepository.findAllPengguna(limit, offset);
    const total = await AdminRepository.countAllPengguna();
    
    return buatPagination(data, halaman, limit, total);
  }

  async suspendAkun(id) {
    return await AdminRepository.updateAccountStatus(id, false);
  }

  async aktifkanAkun(id) {
    return await AdminRepository.updateAccountStatus(id, true);
  }

  async antrianVerifikasi() {
    return await AdminRepository.findAntrianVerifikasi();
  }

  async prosesVerifikasi(id, status, adminId) {
    return await AdminRepository.verifyDokter(id, status, adminId);
  }

  async daftarLaporan() {
    return await AdminRepository.findReports();
  }

  async tindakLaporan(id, tindakan, adminId) {
    // tindakan: 'dihapus' or 'diabaikan'
    const status = tindakan === 'dihapus' ? 'dihapus' : 'diabaikan';
    await AdminRepository.updateReportStatus(id, status, adminId);
    
    if (tindakan === 'dihapus') {
      // Logika penghapusan konten asli perlu tahu tipe_konten dari tabel laporan
      // Untuk simplisitas di fase ini kita update status laporan saja.
    }
    return true;
  }
}

module.exports = new AdminService();
