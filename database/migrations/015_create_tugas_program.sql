-- TABEL: tugas_program
-- Checklist & tugas harian dalam program kesehatan

CREATE TABLE IF NOT EXISTS tugas_program (
    id INT PRIMARY KEY AUTO_INCREMENT,
    program_id INT NOT NULL,
    hari_ke INT NOT NULL,
    judul_tugas VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    tipe ENUM('checklist', 'input_data', 'artikel', 'olahraga') NOT NULL,
    target_nilai VARCHAR(50),
    FOREIGN KEY (program_id) REFERENCES program_kesehatan(id) ON DELETE CASCADE,
    INDEX (program_id),
    INDEX (hari_ke)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
