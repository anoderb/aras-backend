-- TABEL: catatan_kesehatan_harian
-- Log data kesehatan harian user

CREATE TABLE IF NOT EXISTS catatan_kesehatan_harian (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    berat_badan DECIMAL(5, 2),
    tinggi_badan DECIMAL(5, 2),
    tekanan_darah_sistolik INT,
    tekanan_darah_diastolik INT,
    gula_darah DECIMAL(6, 2),
    detak_jantung INT,
    suhu_tubuh DECIMAL(4, 1),
    langkah_kaki INT,
    mood ENUM('sangat_baik', 'baik', 'netral', 'buruk', 'sangat_buruk'),
    catatan TEXT,
    tgl_dicatat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (tgl_dicatat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
