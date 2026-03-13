const db = require('../config/database');

class AdminRepository {
  // Dashboard
  async getDashboardStats() {
    const [[{ total_pengguna }]] = await db.execute('SELECT COUNT(*) as total_pengguna FROM pengguna');
    const [[{ total_dokter }]] = await db.execute("SELECT COUNT(*) as total_dokter FROM pengguna WHERE peran = 'dokter'");
    const [[{ total_konsultasi }]] = await db.execute('SELECT COUNT(*) as total_konsultasi FROM konsultasi');
    const [[{ antrian_verifikasi }]] = await db.execute("SELECT COUNT(*) as antrian_verifikasi FROM profil_dokter WHERE status_verifikasi = 'menunggu'");
    
    return { total_pengguna, total_dokter, total_konsultasi, antrian_verifikasi };
  }

  // Pengguna
  async findAllPengguna(limit, offset) {
    let sql = `SELECT id, nama, email, peran, status_aktif, tgl_daftar FROM pengguna ORDER BY tgl_daftar DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    const [rows] = await db.execute(sql, []);
    return rows;
  }

  async countAllPengguna() {
    const [[{ total }]] = await db.execute('SELECT COUNT(*) as total FROM pengguna');
    return total;
  }

  async updateAccountStatus(id, status) {
    await db.execute('UPDATE pengguna SET status_aktif = ? WHERE id = ?', [status, id]);
    return true;
  }

  // Verifikasi Dokter
  async findAntrianVerifikasi() {
    const [rows] = await db.execute(
      `SELECT p.id, u.nama, p.no_str, p.no_sip, p.spesialisasi, p.status_verifikasi, p.tgl_update
       FROM profil_dokter p
       JOIN pengguna u ON p.pengguna_id = u.id
       WHERE p.status_verifikasi = 'menunggu'
       ORDER BY p.tgl_update ASC`
    );
    return rows;
  }

  async verifyDokter(id, status, adminId) {
    await db.execute(
      'UPDATE profil_dokter SET status_verifikasi = ?, tgl_verifikasi = NOW(), diverifikasi_oleh = ? WHERE id = ?',
      [status, adminId, id]
    );
    return true;
  }

  // Moderasi
  async findReports() {
    const [rows] = await db.execute(
      'SELECT * FROM laporan_konten WHERE status = "menunggu" ORDER BY tgl_laporan DESC'
    );
    return rows;
  }

  async updateReportStatus(id, status, adminId) {
    await db.execute(
      'UPDATE laporan_konten SET status = ?, ditangani_oleh = ? WHERE id = ?',
      [status, adminId, id]
    );
    return true;
  }

  async deleteContent(table, id) {
    // General delete for reported content (postingan/komentar)
    await db.execute(`UPDATE ${table} SET status = 'dihapus' WHERE id = ?`, [id]);
    return true;
  }
}

module.exports = new AdminRepository();
