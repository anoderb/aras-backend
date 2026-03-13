-- TABEL: log_minum_obat
-- Riwayat minum obat untuk tracking kepatuhan

CREATE TABLE IF NOT EXISTS log_minum_obat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    obat_pengguna_id INT NOT NULL,
    pengguna_id INT NOT NULL,
    jadwal_minum DATETIME NOT NULL,
    waktu_diminum DATETIME NULL,
    status ENUM('tepat_waktu', 'terlambat', 'terlewat'),
    FOREIGN KEY (obat_pengguna_id) REFERENCES obat_pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (obat_pengguna_id),
    INDEX (pengguna_id),
    INDEX (jadwal_minum)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
