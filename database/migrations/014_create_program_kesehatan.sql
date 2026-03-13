-- TABEL: program_kesehatan
-- Program kesehatan yang dibuat dokter untuk pasien

CREATE TABLE IF NOT EXISTS program_kesehatan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dokter_id INT NOT NULL,
    pengguna_id INT NOT NULL,
    judul VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    durasi_hari INT,
    kategori ENUM('diet', 'olahraga', 'pemulihan', 'penyakit_kronis', 'lainnya'),
    status ENUM('aktif', 'selesai', 'dibatalkan') DEFAULT 'aktif',
    tgl_mulai DATE,
    tgl_selesai DATE,
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dokter_id) REFERENCES profil_dokter(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (dokter_id),
    INDEX (pengguna_id),
    INDEX (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
