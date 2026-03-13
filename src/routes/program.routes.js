const router = require('express').Router();
const ProgramController = require('../controllers/program.controller');
const validate = require('../middleware/validate.middleware');
const { buatProgram, tambahTugas, updateProgres } = require('../validations/program.validation');
const auth = require('../middleware/auth.middleware');
const { isDokter } = require('../middleware/role.middleware');

router.use(auth);

// USER
router.get('/', ProgramController.programSaya);
router.get('/:id', ProgramController.detailProgram);
router.get('/:id/tugas-hari-ini', ProgramController.tugasHariIni);
router.post('/:id/tugas/:tugas_id/selesai', validate(updateProgres), ProgramController.updateProgres); // Reuse status='selesai' in validation
router.get('/:id/progres', ProgramController.progresKeseluruhan);

// DOKTER
router.get('/dokter', isDokter, ProgramController.daftarProgramDokter);
router.post('/dokter', isDokter, validate(buatProgram), ProgramController.buatProgram);
router.get('/dokter/:id', isDokter, ProgramController.detailProgram);
// router.put('/dokter/:id', isDokter, ProgramController.updateProgram); // Optional
// router.delete('/dokter/:id', isDokter, ProgramController.hapusProgram); // Optional
router.post('/dokter/:id/tugas', isDokter, validate(tambahTugas), ProgramController.tambahTugas);
router.get('/dokter/:id/progres-pasien', isDokter, ProgramController.progresPasien);

module.exports = router;
