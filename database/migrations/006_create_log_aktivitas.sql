-- TABEL: log_aktivitas
-- Log aktivitas fisik harian

CREATE TABLE IF NOT EXISTS log_aktivitas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    jenis_aktivitas VARCHAR(100),
    durasi_menit INT,
    kalori_terbakar DECIMAL(8, 2),
    intensitas ENUM('ringan', 'sedang', 'berat'),
    catatan TEXT,
    tgl_dicatat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (tgl_dicatat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
