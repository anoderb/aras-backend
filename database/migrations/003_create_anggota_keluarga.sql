-- TABEL: anggota_keluarga
-- Relasi antar pengguna dalam satu keluarga

CREATE TABLE IF NOT EXISTS anggota_keluarga (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pemilik_id INT NOT NULL,
    anggota_id INT NOT NULL,
    hubungan ENUM('pasangan', 'anak', 'orang_tua', 'lainnya') NOT NULL,
    tgl_ditambahkan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pemilik_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (anggota_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pemilik_id),
    INDEX (anggota_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
