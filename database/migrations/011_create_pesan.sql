-- TABEL: pesan
-- Pesan chat dalam sesi konsultasi

CREATE TABLE IF NOT EXISTS pesan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    konsultasi_id INT NOT NULL,
    pengirim_id INT NOT NULL,
    tipe_pengirim ENUM('user', 'dokter') NOT NULL,
    isi_pesan TEXT,
    tipe_pesan ENUM('teks', 'gambar', 'file', 'suara') DEFAULT 'teks',
    url_file VARCHAR(255) NULL,
    sudah_dibaca BOOLEAN DEFAULT FALSE,
    tgl_kirim TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (konsultasi_id) REFERENCES konsultasi(id) ON DELETE CASCADE,
    FOREIGN KEY (pengirim_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (konsultasi_id),
    INDEX (pengirim_id),
    INDEX (tgl_kirim)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
