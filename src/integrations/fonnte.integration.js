const axios = require('axios');
const config = require('../config/app.config');

const kirimWA = async (noTelepon, pesan) => {
  try {
    const response = await axios.post('https://api.fonnte.com/send', {
      target: noTelepon,
      message: pesan,
      countryCode: '62', // Default Indonesia
    }, {
      headers: {
        Authorization: config.fonnte.token,
      },
    });

    console.log('✅ WhatsApp (Fonnte) Terkirim ke:', noTelepon);
    return response.data;
  } catch (err) {
    console.error('❌ Gagal Kirim WhatsApp (Fonnte):', err.response?.data || err.message);
    throw err;
  }
};

module.exports = { kirimWA };
