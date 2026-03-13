const Nominatim = require('../integrations/nominatim.integration');
const Overpass = require('../integrations/overpass.integration');

class FaskesService {
  async faskesTerdekat(lat, lng, radius) {
    const data = await Overpass.cariFaskesTerdekat(lat, lng, radius);
    // Transformasi data OSM ke format yang lebih bersahabat jika perlu
    return data.elements.map(el => ({
      id: el.id,
      nama: el.tags.name || 'Faskes Tanpa Nama',
      tipe: el.tags.amenity,
      lat: el.lat || (el.center ? el.center.lat : null),
      lng: el.lon || (el.center ? el.center.lon : null),
      alamat: el.tags['addr:full'] || el.tags['addr:street'] || 'Alamat tidak tersedia'
    }));
  }

  async cariFaskes(q, lat, lng) {
    const data = await Overpass.cariFaskesNama(q, lat, lng);
    return data.elements.map(el => ({
      id: el.id,
      nama: el.tags.name,
      tipe: el.tags.amenity,
      lat: el.lat || (el.center ? el.center.lat : null),
      lng: el.lon || (el.center ? el.center.lon : null),
      alamat: el.tags['addr:full'] || el.tags['addr:street']
    })).filter(el => el.nama); // Filter yang punya nama saja
  }

  async geocode(alamat) {
    return await Nominatim.geocode(alamat);
  }

  async reverseGeocode(lat, lng) {
    return await Nominatim.reverseGeocode(lat, lng);
  }
}

module.exports = new FaskesService();
