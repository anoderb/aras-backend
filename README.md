# ARAS Backend — Akses Rawat Aman Sehat

**ARAS** (Akses Rawat Aman Sehat) adalah platform ekosistem kesehatan digital yang menghubungkan pasien, dokter, dan fasilitas kesehatan. Backend ini menyediakan API yang tangguh, aman, dan scalable untuk mendukung ekosistem ARAS.

## ✨ Fitur Utama

- **Autentikasi & Keamanan**: Registrasi, Login (JWT), Verifikasi OTP, dan Reset Sandi.
- **Catatan Kesehatan (EMR)**: Log harian kesehatan (berat badan, tekanan darah, gula darah, dll) dengan visualisasi grafik.
- **Nutrisi & Aktivitas**: Kalkulator kalori harian, log makanan (barcode support), dan log aktivitas fisik.
- **Manajemen Obat**: Pengingat minum obat, cek interaksi obat, dan statistik kepatuhan.
- **Telemedis & Konsultasi**: Chat realtime dengan dokter, manajemen resep digital, dan rating dokter.
- **Komunitas & Diskusi**: Forum Q&A kesehatan dan feed diskusi publik dengan moderasi dokter.

## 🛠️ Arsitektur & Teknologi

Aplikasi ini dibangun menggunakan arsitektur **Layered (Route → Controller → Service → Repository)** untuk memastikan pemisahan tanggung jawab yang bersih.

### Tech Stack
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL 8.0](https://www.mysql.com/)
- **Caching**: [Redis](https://redis.io/)
- **Realtime**: [Socket.IO](https://socket.io/)
- **Storage**: [Cloudinary](https://cloudinary.com/) (Media & Document Storage)

## 📁 Struktur Proyek
```text
src/
├── routes/       # Definisi endpoint & middleware routing
├── controllers/  # Penanganan request/response API
├── services/     # Logika bisnis utama (Core Logic)
├── repositories/ # Query database terpusat
├── middleware/   # Keamanan & filter (Auth, Role, Upload)
├── integrations/ # Koneksi pihak ketiga (WA, Email, FDA)
└── database/     # Skema database & migrasi SQL
```

## ⚡ Quick Start API Reference

| Method | Endpoint | Keterangan |
|---|---|---|
| `POST` | `/api/v1/auth/masuk` | Login & dapatkan token |
| `GET` | `/api/v1/pengguna/dashboard` | Ambil ringkasan dashboard |
| `GET` | `/api/v1/kesehatan/harian` | Riwayat kesehatan user |
| `GET` | `/api/v1/obat` | Daftar obat aktif |
| `GET` | `/api/v1/notifikasi` | Daftar notifikasi terbaru |

## 📊 Kode Respon API

ARAS menggunakan kode respon HTTP standar untuk menandakan status permintaan API:

| Kode | Keterangan |
|---|---|
| **200** | **Berhasil**: Permintaan sukses dan data dikembalikan. |
| **201** | **Berhasil Dibuat**: Data baru berhasil disimpan ke database. |
| **400** | **Request Tidak Valid**: Parameter input salah atau tidak lengkap. |
| **401** | **Tidak Terautentikasi**: Token JWT tidak valid atau sudah kedaluwarsa. |
| **403** | **Tidak Punya Akses**: Anda tidak memiliki izin untuk akses ini (role mismatch). |
| **404** | **Data Tidak Ditemukan**: Endpoint atau ID data tidak tersedia. |
| **429** | **Terlalu Banyak Request**: Batas rate limit telah tercapai. |
| **500** | **Kesalahan Server**: Terjadi masalah internal pada server. |

## ⚙️ Persiapan Lokal

1. **Install Dependensi**: `npm install`
2. **Environment Variable**: Salin `.env.example` menjadi `.env` dan isi kredensial.
3. **Migrasi Database**: `node database/migrate.js`
4. **Jalankan Server**: `npm run dev`

---
© 2026 ARAS Project - *Kesehatan Mudah, Hidup Lebih Baik.*
