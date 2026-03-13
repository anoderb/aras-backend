-- TABEL: badge_pengguna
-- Badge yang dimiliki pengguna

CREATE TABLE IF NOT EXISTS badge_pengguna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    kode_badge VARCHAR(50) NOT NULL,
    nama_badge VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    ikon VARCHAR(255),
    tgl_diperoleh TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (kode_badge)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
