-- TABEL: jawaban_forum
-- Jawaban pada pertanyaan forum

CREATE TABLE IF NOT EXISTS jawaban_forum (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pertanyaan_id INT NOT NULL,
    pengguna_id INT NOT NULL,
    isi TEXT NOT NULL,
    is_jawaban_terbaik BOOLEAN DEFAULT FALSE,
    is_dari_dokter BOOLEAN DEFAULT FALSE,
    total_suka INT DEFAULT 0,
    tgl_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pertanyaan_id) REFERENCES forum_pertanyaan(id) ON DELETE CASCADE,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    INDEX (pertanyaan_id),
    INDEX (pengguna_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
