-- TABEL: laporan_konten
-- Laporan konten tidak pantas

CREATE TABLE IF NOT EXISTS laporan_konten (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pelapor_id INT NOT NULL,
    tipe_konten ENUM('postingan', 'komentar') NOT NULL,
    konten_id INT NOT NULL,
    alasan ENUM('misinformasi', 'tidak_pantas', 'spam', 'berbahaya', 'lainnya') NOT NULL,
    keterangan TEXT,
    status ENUM('menunggu', 'ditinjau', 'dihapus', 'diabaikan') DEFAULT 'menunggu',
    ditangani_oleh INT NULL,
    tgl_laporan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pelapor_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (ditangani_oleh) REFERENCES pengguna(id) ON DELETE SET NULL,
    INDEX (status),
    INDEX (tipe_konten),
    INDEX (pelapor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
