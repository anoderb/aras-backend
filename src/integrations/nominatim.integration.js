const axios = require('axios');

class NominatimIntegration {
  async geocode(alamat) {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: alamat,
          format: 'json',
          addressdetails: 1,
          limit: 5
        },
        headers: {
          'User-Agent': 'ARAS-App/1.0'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Nominatim Geocode Error:', error.message);
      return [];
    }
  }

  async reverseGeocode(lat, lng) {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon: lng,
          format: 'json'
        },
        headers: {
          'User-Agent': 'ARAS-App/1.0'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Nominatim Reverse Geocode Error:', error.message);
      return null;
    }
  }
}

module.exports = new NominatimIntegration();
