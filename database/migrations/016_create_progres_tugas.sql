-- TABEL: progres_tugas
-- Tracking penyelesaian tugas program oleh user

CREATE TABLE IF NOT EXISTS progres_tugas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tugas_id INT NOT NULL,
    pengguna_id INT NOT NULL,
    status ENUM('belum', 'selesai', 'dilewati') DEFAULT 'belum',
    nilai_aktual VARCHAR(50),
    catatan TEXT,
    tgl_selesai TIMESTAMP NULL,
    FOREIGN KEY (tugas_id) REFERENCES tugas_program(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (tugas_id),
    INDEX (pengguna_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
