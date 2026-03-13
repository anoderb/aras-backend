# ARAS Backend — Akses Rawat Aman Sehat

Backend API untuk aplikasi kesehatan ARAS. Dibangun menggunakan Node.js dengan arsitektur layered (Controller -> Service -> Repository).

## 🚀 Teknologi Utama
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 8.0 (mysql2)
- **Caching**: Redis (ioredis)
- **Realtime**: Socket.IO
- **Storage**: Cloudinary
- **Auth**: JWT (JSON Web Token)
- **Validation**: Joi
- **Logger**: Winston + Morgan
- **Security**: Helmet, Bcrypt

## 📁 Struktur Folder
```text
src/
├── config/       # Konfigurasi database, redis, socket, dll
├── routes/       # Definisi endpoint API
├── controllers/  # Layer penanganan request/response
├── services/     # Layer logika bisnis (core logic)
├── repositories/ # Layer query database (raw sql)
├── middleware/   # Proteksi (auth, role, upload, dll)
├── helpers/      # Fungsi utilitas (response, jwt, etc)
├── constants/    # Master data statis
├── integrations/ # Koneksi API pihak ketiga (Email, WA)
└── socket/       # Penanganan event socket.io
database/
├── migrations/   # 28 tabel skema database (SQL)
└── migrate.js    # Script runner migrasi otomatis
```

## ⚙️ Persiapan Lokal
1. Install Dependensi:
   ```bash
   npm install
   ```
2. Setup Environment Variables:
   - Salin `.env.example` menjadi `.env`
   - Isi kredensial yang diperlukan (MySQL, Redis, Cloudinary, etc)
3. Jalankan Migrasi Database:
   ```bash
   node database/migrate.js
   ```
4. Jalankan Server:
   - Mode Development: `npm run dev`
   - Mode Production: `npm start`

## 🛡️ Aturan Pengembangan
- Gunakan Bahasa Indonesia untuk penamaan variabel, fungsi, dan komentar.
- Ikuti standar layered architecture (Jangan query DB di Controller).
- Pastikan setiap input divalidasi menggunakan Joi middleware.
- Gunakan `response.helper` untuk format kembalian JSON yang seragam.

---
© 2026 ARAS Project - Kesehatan Mudah, Hidup Lebih Baik.
