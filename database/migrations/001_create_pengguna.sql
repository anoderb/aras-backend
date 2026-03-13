-- TABEL: pengguna
-- Tabel utama semua pengguna (user, dokter, admin)

CREATE TABLE IF NOT EXISTS pengguna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    no_telepon VARCHAR(20),
    kata_sandi VARCHAR(255) NOT NULL,
    peran ENUM('user', 'dokter', 'admin') NOT NULL,
    langganan ENUM('gratis', 'premium') DEFAULT 'gratis',
    foto_profil VARCHAR(255),
    tgl_lahir DATE,
    jenis_kelamin ENUM('laki-laki', 'perempuan'),
    golongan_darah ENUM('A', 'B', 'AB', 'O'),
    alergi TEXT,
    kondisi_kronis TEXT,
    kontak_darurat_nama VARCHAR(100),
    kontak_darurat_telepon VARCHAR(20),
    status_aktif BOOLEAN DEFAULT TRUE,
    tgl_daftar TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tgl_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (email),
    INDEX (no_telepon),
    INDEX (peran)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
