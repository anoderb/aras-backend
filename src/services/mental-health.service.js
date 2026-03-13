const MentalHealthRepository = require('../repositories/mental-health.repository');
const NotifikasiRepository = require('../repositories/notifikasi.repository');

class MentalHealthService {
  async getScreeningQuestions(tipe) {
    // Statis untuk PHQ-9 (Depresi)
    if (tipe === 'phq-9') {
      return [
        { id: 1, pertanyaan: 'Kurang berminat atau bergairah dalam melakukan sesuatu' },
        { id: 2, pertanyaan: 'Merasa sedih, depresi, atau putus asa' },
        { id: 3, pertanyaan: 'Sulit tidur, terbangun malam hari, atau terlalu banyak tidur' },
        { id: 4, pertanyaan: 'Merasa lelah atau kurang bertenaga' },
        { id: 5, pertanyaan: 'Kurang nafsu makan atau terlalu banyak makan' },
        { id: 6, pertanyaan: 'Kurang percaya diri atau merasa gagal' },
        { id: 7, pertanyaan: 'Sulit berkonsentrasi' },
        { id: 8, pertanyaan: 'Bergerak atau berbicara sangat lambat' },
        { id: 9, pertanyaan: 'Berpikir lebih baik mati atau ingin melukai diri sendiri' }
      ];
    }
    return [];
  }

  async hitungSkor(penggunaId, tipe, jawaban) {
    const skor = jawaban.reduce((acc, curr) => acc + curr.nilai, 0);
    let hasil = '';

    if (tipe === 'phq-9') {
      if (skor <= 4) hasil = 'Minimal atau tidak ada depresi';
      else if (skor <= 9) hasil = 'Depresi ringan';
      else if (skor <= 14) hasil = 'Depresi sedang';
      else if (skor <= 19) hasil = 'Depresi sedang-berat';
      else hasil = 'Depresi berat';
    }

    // Simpan ke riwayat (notifikasi)
    await NotifikasiRepository.create({
      pengguna_id: penggunaId,
      judul: `Hasil Skrining ${tipe.toUpperCase()}`,
      pesan: `Skor Anda: ${skor}. Interpretasi: ${hasil}`,
      tipe: 'sistem'
    });

    return { skor, hasil };
  }

  async analisisMood(penggunaId) {
    const riwayat = await MentalHealthRepository.getMoodHistory(penggunaId);
    
    // Hitung distribusi mood
    const distribusi = riwayat.reduce((acc, curr) => {
      acc[curr.mood] = (acc[curr.mood] || 0) + 1;
      return acc;
    }, {});

    return {
      total_data: riwayat.length,
      distribusi,
      riwayat
    };
  }
}

module.exports = new MentalHealthService();
