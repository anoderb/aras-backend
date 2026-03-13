-- TABEL: rating_dokter
-- Rating & review pasien untuk dokter

CREATE TABLE IF NOT EXISTS rating_dokter (
    id INT PRIMARY KEY AUTO_INCREMENT,
    konsultasi_id INT NOT NULL,
    pengguna_id INT NOT NULL,
    dokter_id INT NOT NULL,
    nilai TINYINT NOT NULL CHECK (nilai BETWEEN 1 AND 5),
    ulasan TEXT,
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (konsultasi_id) REFERENCES konsultasi(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (dokter_id) REFERENCES profil_dokter(id) ON DELETE CASCADE,
    INDEX (dokter_id),
    INDEX (pengguna_id),
    INDEX (konsultasi_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
