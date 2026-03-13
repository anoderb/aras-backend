const DokumenRepository = require('../repositories/dokumen.repository');
const { buatPagination } = require('../helpers/pagination.helper');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

class DokumenService {
  async daftar(userId, filter, page = 1, limit = 10) {
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const offset = (_page - 1) * _limit;

    const { data, total } = await DokumenRepository.daftarPaging(userId, filter, _limit, offset);
    const meta = buatPagination(_page, _limit, total);

    return { data, meta };
  }

  async upload(userId, payload, file) {
    let url_file = null;
    if (file) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'aras/dokumen',
          resource_type: 'auto'
        });
        url_file = result.secure_url;
        // Clean up local file
        fs.unlinkSync(file.path);
      } catch (error) {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        throw new Error('Gagal mengunggah file ke Cloudinary: ' + error.message);
      }
    }

    payload.url_file = url_file;
    return await DokumenRepository.tambah(userId, payload);
  }

  async detail(userId, id) {
    const record = await DokumenRepository.findDetail(id, userId);
    if (!record) throw new Error('Dokumen medis tidak ditemukan');
    return record;
  }

  async update(userId, id, payload) {
    const record = await DokumenRepository.findDetail(id, userId);
    if (!record) throw new Error('Dokumen medis tidak ditemukan');

    await DokumenRepository.update(id, userId, payload);
    return await this.detail(userId, id);
  }

  async hapus(userId, id) {
    const record = await DokumenRepository.findDetail(id, userId);
    if (!record) throw new Error('Dokumen medis tidak ditemukan');

    // Optional: Delete from Cloudinary if needed
    await DokumenRepository.hapus(id, userId);
    return true;
  }

  async bagikan(userId, id, dokterId) {
    const record = await DokumenRepository.findDetail(id, userId);
    if (!record) throw new Error('Dokumen medis tidak ditemukan');

    // Simulasi bagikan (misal kirim notif atau buat entry di tabel sharing)
    return { status: true, pesan: `Dokumen berhasil dibagikan ke dokter ID ${dokterId}` };
  }
}

module.exports = new DokumenService();
