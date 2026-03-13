-- TABEL: komentar
-- Komentar pada postingan Diskusi Publik

CREATE TABLE IF NOT EXISTS komentar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    postingan_id INT NOT NULL,
    pengguna_id INT NOT NULL,
    komentar_induk_id INT NULL,
    isi TEXT NOT NULL,
    is_anonim BOOLEAN DEFAULT FALSE,
    is_koreksi_dokter BOOLEAN DEFAULT FALSE,
    total_suka INT DEFAULT 0,
    status ENUM('aktif', 'dilaporkan', 'dihapus') DEFAULT 'aktif',
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postingan_id) REFERENCES postingan(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (komentar_induk_id) REFERENCES komentar(id) ON DELETE CASCADE,
    INDEX (postingan_id),
    INDEX (pengguna_id),
    INDEX (komentar_induk_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
