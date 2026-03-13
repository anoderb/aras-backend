-- TABEL: notifikasi
-- Notifikasi dalam aplikasi

CREATE TABLE IF NOT EXISTS notifikasi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    judul VARCHAR(100),
    pesan TEXT,
    tipe ENUM('konsultasi', 'reminder_obat', 'janji_temu', 'program', 'komunitas', 'sistem'),
    referensi_tipe VARCHAR(50) NULL,
    referensi_id INT NULL,
    sudah_dibaca BOOLEAN DEFAULT FALSE,
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (sudah_dibaca),
    INDEX (tgl_dibuat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
