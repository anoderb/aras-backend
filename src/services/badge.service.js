const BadgeRepository = require('../repositories/badge.repository');

class BadgeService {
  async badgeSaya(penggunaId) {
    return await BadgeRepository.findAllByPengguna(penggunaId);
  }

  async badgeTersedia() {
    return await BadgeRepository.findAvailable();
  }

  async badgePenggunaLain(penggunaId) {
    return await BadgeRepository.findByPenggunaId(penggunaId);
  }
}

module.exports = new BadgeService();
