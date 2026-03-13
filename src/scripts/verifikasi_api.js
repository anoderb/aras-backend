require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/v1';

const endpoints = [
  // AUTH
  { method: 'GET', url: '/artikel', name: 'Daftar Artikel (Public)', type: 'public' },
  { method: 'GET', url: '/diskusi', name: 'Feed Diskusi (Public)', type: 'public' },
  { method: 'GET', url: '/forum', name: 'Forum Q&A (Public)', type: 'public' },
  { method: 'GET', url: '/dokter', name: 'Daftar Dokter (Public)', type: 'public' },
  { method: 'GET', url: '/dokter/spesialisasi', name: 'Spesialisasi Dokter (Public)', type: 'public' },
  { method: 'GET', url: '/nutrisi/cari?q=nasi', name: 'Cari Makanan (Public)', type: 'public' },
  { method: 'GET', url: '/obat/cari?q=paracetamol', name: 'Cari Obat (Public)', type: 'public' },
];

async function verify() {
  console.log('🚀 Memulai Verifikasi API...');
  console.log('-----------------------------------');

  let successCount = 0;
  let failCount = 0;

  // 0. Test Registrasi
  try {
    console.log('📝 Mencoba Registrasi (test@aras.com)...');
    const registerRes = await axios.post(`${BASE_URL}/auth/daftar`, {
      nama: 'Test User',
      email: 'test' + Date.now() + '@aras.com',
      no_telepon: '0812' + Math.floor(Math.random() * 10000000),
      kata_sandi: 'Password123!',
      peran: 'user'
    });
    console.log('✅ Registrasi Berhasil!');
  } catch (err) {
    console.error('❌ Registrasi Gagal:', err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
  }

  // 1. Test Login untuk dapet token
  let token = '';
  try {
    console.log('🔑 Mencoba Login (user@aras.com)...');
    const loginRes = await axios.post(`${BASE_URL}/auth/masuk`, {
      email: 'user@aras.com',
      kata_sandi: 'Password123!'
    });
    token = loginRes.data.data.token;
    console.log('✅ Login Berhasil!');
  } catch (err) {
    console.error('❌ Login Gagal:', err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
  }

  // 2. Tambahkan endpoint yang butuh token
  if (token) {
    endpoints.push(
      { method: 'GET', url: '/pengguna/profil', name: 'Profil Sendiri', type: 'protected' },
      { method: 'GET', url: '/pengguna/dashboard', name: 'Dashboard User', type: 'protected' },
      { method: 'GET', url: '/keluarga', name: 'Daftar Keluarga', type: 'protected' },
      { method: 'GET', url: '/kesehatan/harian', name: 'Riwayat Kesehatan', type: 'protected' },
      { method: 'GET', url: '/nutrisi/makanan', name: 'Riwayat Makanan', type: 'protected' },
      { method: 'GET', url: '/obat', name: 'Daftar Obat Aktif', type: 'protected' },
      { method: 'GET', url: '/notifikasi', name: 'Daftar Notifikasi', type: 'protected' }
    );
  }

  // 3. Jalankan semua test
  for (const ep of endpoints) {
    try {
      const config = {
        method: ep.method,
        url: `${BASE_URL}${ep.url}`,
        headers: ep.type === 'protected' ? { Authorization: `Bearer ${token}` } : {}
      };

      const start = Date.now();
      const res = await axios(config);
      const duration = Date.now() - start;

      console.log(`✅ [${res.status}] ${ep.name} (${duration}ms)`);
      successCount++;
    } catch (err) {
      const status = err.response ? err.response.status : 'ERR';
      const msg = err.response && err.response.data ? (err.response.data.pesan || err.response.data.error) : err.message;
      const data = err.response && err.response.data ? JSON.stringify(err.response.data) : '';
      console.error(`❌ [${status}] ${ep.name} -> ${msg} ${data}`);
      failCount++;
    }
  }

  console.log('-----------------------------------');
  console.log(`📊 Hasil: ${successCount} Berhasil, ${failCount} Gagal.`);
  
  if (failCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

verify();
