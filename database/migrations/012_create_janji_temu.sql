-- TABEL: janji_temu
-- Booking jadwal konsultasi

CREATE TABLE IF NOT EXISTS janji_temu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    dokter_id INT NOT NULL,
    tgl_jadwal DATETIME NOT NULL,
    jenis ENUM('online', 'tatap_muka') NOT NULL,
    status ENUM('menunggu', 'dikonfirmasi', 'selesai', 'dibatalkan') DEFAULT 'menunggu',
    lokasi VARCHAR(255) NULL,
    keluhan TEXT,
    catatan TEXT,
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (dokter_id) REFERENCES profil_dokter(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (dokter_id),
    INDEX (status),
    INDEX (tgl_jadwal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
