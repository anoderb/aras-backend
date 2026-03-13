-- TABEL: dokumen_medis
-- Penyimpanan dokumen medis user

CREATE TABLE IF NOT EXISTS dokumen_medis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    judul VARCHAR(100) NOT NULL,
    jenis ENUM('hasil_lab', 'resep', 'diagnosis', 'lainnya') NOT NULL,
    url_file VARCHAR(255),
    nilai_abnormal BOOLEAN DEFAULT FALSE,
    ringkasan TEXT,
    tgl_dokumen DATE,
    tgl_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (jenis),
    INDEX (tgl_dokumen)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
