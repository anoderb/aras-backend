-- TABEL: profil_dokter
-- Data profesional dokter — relasi 1:1 dengan pengguna

CREATE TABLE IF NOT EXISTS profil_dokter (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    no_str VARCHAR(50) UNIQUE,
    no_sip VARCHAR(50),
    spesialisasi VARCHAR(100),
    pendidikan TEXT,
    pengalaman_tahun INT,
    bio TEXT,
    biaya_konsultasi DECIMAL(10, 2),
    lokasi_praktik VARCHAR(255),
    jam_praktik JSON,
    status_verifikasi ENUM('menunggu', 'terverifikasi', 'ditolak') DEFAULT 'menunggu',
    tgl_verifikasi TIMESTAMP NULL,
    diverifikasi_oleh INT,
    status_online BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_konsultasi INT DEFAULT 0,
    tgl_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (diverifikasi_oleh) REFERENCES pengguna(id) ON DELETE SET NULL,
    INDEX (pengguna_id),
    INDEX (no_str),
    INDEX (status_verifikasi),
    INDEX (spesialisasi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
