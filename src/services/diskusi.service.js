const DiskusiRepository = require('../repositories/diskusi.repository');
const { buatPagination } = require('../helpers/pagination.helper');

class DiskusiService {
  async feedDiskusi(query, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await DiskusiRepository.findAllPaging(_limit, offset, query);
    return { data, meta: buatPagination(_page, _limit, total) };
  }

  async buatPost(penggunaId, payload) {
    const id = await DiskusiRepository.createPost({ ...payload, pengguna_id: penggunaId });
    return await DiskusiRepository.findById(id);
  }

  async detailPost(id) {
    const post = await DiskusiRepository.findById(id);
    if (!post) throw new Error('Post tidak ditemukan');
    const komentar = await DiskusiRepository.findKomentarByPost(id);
    return { ...post, komentar };
  }

  async editPost(id, penggunaId, payload) {
    const post = await DiskusiRepository.findById(id);
    if (!post || post.pengguna_id !== penggunaId) throw new Error('Hanya penulis yang dapat mengedit post');
    await DiskusiRepository.updatePost(id, penggunaId, payload);
    return await DiskusiRepository.findById(id);
  }

  async hapusPost(id, penggunaId, peran) {
    const post = await DiskusiRepository.findById(id);
    if (!post) throw new Error('Post tidak ditemukan');
    
    // Admin or Owner can delete
    if (peran !== 'admin' && post.pengguna_id !== penggunaId) throw new Error('Akses ditolak');
    
    await DiskusiRepository.updateStatusPost(id, 'dihapus');
    return true;
  }

  // Komentar
  async tambahKomentar(postId, penggunaId, peran, payload) {
    const post = await DiskusiRepository.findById(postId);
    if (!post) throw new Error('Post tidak ditemukan');

    const data = {
      postingan_id: postId,
      pengguna_id: penggunaId,
      ...payload,
      is_koreksi_dokter: peran === 'dokter'
    };
    
    const id = await DiskusiRepository.createKomentar(data);
    return id;
  }

  async hapusKomentar(komentarId, penggunaId, peran) {
    // Logic inside repo or here? Here is safer for checks.
    await DiskusiRepository.deleteKomentar(komentarId, penggunaId);
    return true;
  }

  // Interaksi
  async sukaKonten(penggunaId, tipe, id) {
    return await DiskusiRepository.toggleSuka(penggunaId, tipe, id);
  }

  async laporkanKonten(penggunaId, tipe, id, payload) {
    await DiskusiRepository.createLaporan({
      pelapor_id: penggunaId,
      tipe_konten: tipe,
      konten_id: id,
      ...payload
    });
    // If many reports, maybe auto-hide? (Optional)
    return true;
  }

  // Moderasi Dokter
  async pinKoreksi(postId, penggunaId) {
    // Only if user is doctor (role middleware handled this)
    await DiskusiRepository.setPinned(postId, true);
    return true;
  }

  async sembunyikanPost(postId) {
    await DiskusiRepository.updateStatusPost(postId, 'dihapus');
    return true;
  }
}

module.exports = new DiskusiService();
