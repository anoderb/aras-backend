-- TABEL: second_opinion
-- Request second opinion dari user ke spesialis

CREATE TABLE IF NOT EXISTS second_opinion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    dokter_id INT NOT NULL,
    diagnosis_awal TEXT,
    dokumen_medis JSON,
    pertanyaan TEXT,
    pendapat_dokter TEXT NULL,
    biaya DECIMAL(10, 2),
    status ENUM('menunggu', 'diproses', 'selesai') DEFAULT 'menunggu',
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tgl_selesai TIMESTAMP NULL,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (dokter_id) REFERENCES profil_dokter(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (dokter_id),
    INDEX (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
