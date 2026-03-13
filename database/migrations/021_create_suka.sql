-- TABEL: suka
-- Like pada postingan atau komentar

CREATE TABLE IF NOT EXISTS suka (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    tipe_konten ENUM('postingan', 'komentar') NOT NULL,
    konten_id INT NOT NULL,
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    UNIQUE INDEX (pengguna_id, tipe_konten, konten_id),
    INDEX (pengguna_id),
    INDEX (tipe_konten),
    INDEX (konten_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
