-- TABEL: forum_pertanyaan
-- Pertanyaan di Community Forum (Q&A)

CREATE TABLE IF NOT EXISTS forum_pertanyaan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pengguna_id INT NOT NULL,
    judul VARCHAR(200) NOT NULL,
    isi TEXT NOT NULL,
    kategori VARCHAR(50),
    status ENUM('terbuka', 'terjawab', 'ditutup') DEFAULT 'terbuka',
    total_jawaban INT DEFAULT 0,
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pengguna_id),
    INDEX (kategori),
    INDEX (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
