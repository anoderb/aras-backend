const KronisRepository = require('../repositories/kronis.repository');

class KronisService {
  async dashboard(penggunaId) {
    const tren = await KronisRepository.getVitalTrends(penggunaId);
    const alert = await KronisRepository.findLatestUnbalanced(penggunaId);

    return {
      parameter_terakhir: tren[0] || null,
      tren_vital: tren,
      peringatan: alert.map(a => ({
        tgl: a.tgl_dicatat,
        pesan: this._generateAlertMessage(a)
      }))
    };
  }

  _generateAlertMessage(data) {
    let msg = [];
    if (data.gula_darah > 200) msg.push('Gula darah tinggi');
    if (data.tekanan_darah_sistolik > 140) msg.push('Tekanan darah sistolik tinggi (Hipertensi)');
    if (data.detak_jantung > 100) msg.push('Detak jantung tinggi (Takiardia)');
    return msg.join(', ');
  }
}

module.exports = new KronisService();
