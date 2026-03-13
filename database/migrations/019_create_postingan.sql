-- TABEL: postingan
-- Post di fitur Diskusi Publik

CREATE TABLE IF NOT EXISTS postingan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    isi TEXT NOT NULL,
    foto JSON,
    kategori ENUM('cerita', 'tips', 'tanya', 'mental_health', 'ibu_anak', 'penyakit_kronis', 'nutrisi', 'olahraga'),
    is_anonim BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    total_suka INT DEFAULT 0,
    total_komentar INT DEFAULT 0,
    status ENUM('aktif', 'dilaporkan', 'dihapus') DEFAULT 'aktif',
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tgl_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (kategori),
    INDEX (status),
    INDEX (tgl_dibuat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
