-- TABEL: konsultasi
-- Data sesi konsultasi antara user dan dokter

CREATE TABLE IF NOT EXISTS konsultasi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    dokter_id INT NOT NULL,
    jenis ENUM('chat', 'video', 'tatap_muka') NOT NULL,
    status ENUM('menunggu', 'aktif', 'selesai', 'dibatalkan') DEFAULT 'menunggu',
    biaya DECIMAL(10, 2),
    keluhan TEXT,
    catatan_dokter TEXT,
    resep TEXT,
    tgl_mulai TIMESTAMP NULL,
    tgl_selesai TIMESTAMP NULL,
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (dokter_id) REFERENCES profil_dokter(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (dokter_id),
    INDEX (status),
    INDEX (tgl_dibuat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
