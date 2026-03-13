-- TABEL: obat_pengguna
-- Data obat yang dikonsumsi user

CREATE TABLE IF NOT EXISTS obat_pengguna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    dokter_id INT NULL,
    nama_obat VARCHAR(100) NOT NULL,
    dosis VARCHAR(50),
    frekuensi VARCHAR(100),
    waktu_minum JSON,
    tgl_mulai DATE,
    tgl_selesai DATE NULL,
    catatan TEXT,
    status_aktif BOOLEAN DEFAULT TRUE,
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (dokter_id) REFERENCES profil_dokter(id) ON DELETE SET NULL,
    INDEX (pengguna_id),
    INDEX (status_aktif)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
