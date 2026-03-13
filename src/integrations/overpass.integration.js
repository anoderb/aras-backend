const axios = require('axios');

class OverpassIntegration {
  async cariFaskesTerdekat(lat, lng, radius = 5000) {
    try {
      // Query Overpass untuk RS, Klinik, Puskesmas, Apotek
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"~"hospital|clinic|doctors|pharmacy"](around:${radius},${lat},${lng});
          way["amenity"~"hospital|clinic|doctors|pharmacy"](around:${radius},${lat},${lng});
          relation["amenity"~"hospital|clinic|doctors|pharmacy"](around:${radius},${lat},${lng});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Overpass API Error:', error.message);
      return { elements: [] };
    }
  }

  async cariFaskesNama(nama, lat, lng) {
    try {
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"~"hospital|clinic|doctors|pharmacy"]["name"~"${nama}",i](around:50000,${lat},${lng});
          way["amenity"~"hospital|clinic|doctors|pharmacy"]["name"~"${nama}",i](around:50000,${lat},${lng});
          relation["amenity"~"hospital|clinic|doctors|pharmacy"]["name"~"${nama}",i](around:50000,${lat},${lng});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Overpass API Search Name Error:', error.message);
      return { elements: [] };
    }
  }
}

module.exports = new OverpassIntegration();
