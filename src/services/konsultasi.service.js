const KonsultasiRepository = require('../repositories/konsultasi.repository');
const DokterRepository = require('../repositories/dokter.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class KonsultasiService {
  async mulaiKonsultasi(penggunaId, payload) {
    const data = { ...payload, pengguna_id: penggunaId };
    const id = await KonsultasiRepository.create(data);
    return await KonsultasiRepository.findById(id);
  }

  async detailKonsultasi(id, penggunaId, peran) {
    const konsultasi = await KonsultasiRepository.findById(id);
    if (!konsultasi) throw new Error('Konsultasi tidak ditemukan');
    
    // Auth Check
    if (peran === 'user' && konsultasi.pengguna_id !== penggunaId) throw new Error('Anda tidak memiliki akses ke konsultasi ini');
    
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    if (peran === 'dokter' && konsultasi.dokter_id !== profilDokter.id) throw new Error('Anda tidak memiliki akses ke konsultasi ini');
    
    return konsultasi;
  }

  async riwayatUser(penggunaId, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await KonsultasiRepository.findAllByUser(penggunaId, _limit, offset);
    return { data, meta: buatPagination(_page, _limit, total) };
  }

  async riwayatDokter(penggunaId, status = null, page = 1, limit = 10) {
    const profilDokter = await DokterRepository.findByPenggunaId(penggunaId);
    if (!profilDokter) throw new Error('Profil dokter tidak ditemukan');

    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await KonsultasiRepository.findAllByDokter(profilDokter.id, _limit, offset, status);
    return { data, meta: buatPagination(_page, _limit, total) };
  }

  async updateStatus(id, penggunaId, peran, status, extraFields = {}) {
    const konsultasi = await this.detailKonsultasi(id, penggunaId, peran);
    
    // Perencanaan Transisi Status
    if (status === 'aktif' && peran !== 'dokter') throw new Error('Hanya dokter yang bisa menerima konsultasi');
    if (status === 'aktif' && konsultasi.status !== 'menunggu') throw new Error('Konsultasi sudah tidak dalam antrian');
    
    await KonsultasiRepository.updateStatus(id, status, extraFields);
    
    // Jika selesai, update total konsultasi dokter
    if (status === 'selesai') {
        db.execute('UPDATE profil_dokter SET total_konsultasi = total_konsultasi + 1 WHERE id = ?', [konsultasi.dokter_id]);
    }
    
    return await KonsultasiRepository.findById(id);
  }

  async beriRating(id, penggunaId, payload) {
    const konsultasi = await KonsultasiRepository.findById(id);
    if (!konsultasi || konsultasi.pengguna_id !== penggunaId) throw new Error('Konsultasi tidak ditemukan');
    if (konsultasi.status !== 'selesai') throw new Error('Hanya bisa memberi rating pada sesi yang sudah selesai');
    
    await KonsultasiRepository.addRating({
      ...payload,
      konsultasi_id: id,
      pengguna_id: penggunaId,
      dokter_id: konsultasi.dokter_id
    });
    
    return true;
  }

  // Messaging logic
  async kirimPesan(id, pengirimId, tipePengirim, payload) {
    // Validasi sesi aktif
    const konsultasi = await KonsultasiRepository.findById(id);
    if (!konsultasi) throw new Error('Konsultasi tidak ditemukan');
    if (konsultasi.status !== 'aktif') throw new Error('Sesi chat sudah berakhir atau belum dimulai');

    const pesanId = await KonsultasiRepository.createMessage({
      konsultasi_id: id,
      pengirim_id: pengirimId,
      tipe_pengirim: tipePengirim,
      ...payload
    });
    
    // TODO: Emit Socket.io event here
    
    return { id: pesanId, ...payload, tgl_kirim: new Date() };
  }

  async ambilPesan(id, penggunaId, peran) {
    await this.detailKonsultasi(id, penggunaId, peran); // Auth check
    await KonsultasiRepository.markAsRead(id, penggunaId);
    return await KonsultasiRepository.findMessagesByKonsultasi(id);
  }
}

module.exports = new KonsultasiService();
