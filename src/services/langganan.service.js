const LanggananRepository = require('../repositories/langganan.repository');

class LanggananService {
  async cekStatus(penggunaId) {
    // Sesuai aturan: SEMUA FITUR SAAT INI FULL FREE
    // Kita tetap cek DB, tapi return 'premium' secara default atau pastikan user tahu mereka punya akses penuh.
    const status = await LanggananRepository.getStatus(penggunaId);
    return {
      status_db: status,
      akses: 'premium', // Paksa premium untuk semua fitur di fase ini
      pesan: 'Status langganan Anda aktif (Akses Penuh Aras)'
    };
  }

  async aktivasiPenuh(penggunaId) {
    return await LanggananRepository.updateStatus(penggunaId, 'premium');
  }
}

module.exports = new LanggananService();
