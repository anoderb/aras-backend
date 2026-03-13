const PenggunaRepository = require('../repositories/pengguna.repository');
const FaskesService = require('./faskes.service');
const NotifikasiRepository = require('../repositories/notifikasi.repository');
const Fonnte = require('../integrations/fonnte.integration');

class SOSService {
  async aktifkanSOS(penggunaId, lat, lng) {
    const user = await PenggunaRepository.findById(penggunaId);
    if (!user) throw new Error('Pengguna tidak ditemukan');

    // 1. Simpan status SOS di aplikasi (bisa di DB/Redis)
    // Sementara kita asumsikan trigger logging/notifikasi saja
    
    // 2. Beri notifikasi sistem
    await NotifikasiRepository.create({
      pengguna_id: penggunaId,
      judul: '⚠️ MODE DARURAT AKTIF',
      pesan: 'Anda telah mengaktifkan mode darurat SOS.',
      tipe: 'sistem'
    });

    return { status: 'aktif', user: { nama: user.nama, kontak_darurat: user.kontak_darurat_telepon } };
  }

  async rsTerdekat(lat, lng) {
    // Filter khusus hospital dari faskes service
    const faskes = await FaskesService.faskesTerdekat(lat, lng, 3000); // Radius 3km
    return faskes.filter(f => f.tipe === 'hospital');
  }

  async notifKontakDarurat(penggunaId) {
    const user = await PenggunaRepository.findById(penggunaId);
    if (!user || !user.kontak_darurat_telepon) throw new Error('Kontak darurat tidak ditemukan');

    const pesan = `DARURAT ARAS: ${user.nama} sedang dalam keadaan darurat dan membutuhkan bantuan segera. Mohon segera hubungi atau datangi posisi terakhirnya.`;
    
    // Kirim WA via Fonnte (Mocked)
    await Fonnte.kirimPesan(user.kontak_darurat_telepon, pesan);
    
    return { status: 'dikirim', ke: user.kontak_darurat_nama };
  }

  async ringkasanKesehatan(penggunaId) {
    const user = await PenggunaRepository.findById(penggunaId);
    if (!user) throw new Error('Pengguna tidak ditemukan');

    // Kembalikan data krusial untuk penolong medis
    return {
      nama: user.nama,
      umur: user.tgl_lahir ? (new Date().getFullYear() - new Date(user.tgl_lahir).getFullYear()) : 'N/A',
      jenis_kelamin: user.jenis_kelamin,
      golongan_darah: user.golongan_darah,
      alergi: user.alergi,
      kondisi_kronis: user.kondisi_kronis,
      kontak_darurat: {
        nama: user.kontak_darurat_nama,
        telepon: user.kontak_darurat_telepon
      }
    };
  }

  async nonaktifkanSOS(penggunaId) {
    await NotifikasiRepository.create({
      pengguna_id: penggunaId,
      judul: '✅ MODE DARURAT MATI',
      pesan: 'Mode darurat SOS telah dimatikan.',
      tipe: 'sistem'
    });
    return { status: 'nonaktif' };
  }
}

module.exports = new SOSService();
