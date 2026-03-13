const { hashPassword, comparePassword } = require('../src/helpers/bcrypt.helper');
const { generateAccessToken, generateRefreshToken } = require('../src/helpers/jwt.helper');

jest.mock('../src/repositories/auth.repository');
jest.mock('../src/helpers/bcrypt.helper');
jest.mock('../src/helpers/jwt.helper');

const AuthRepository = require('../src/repositories/auth.repository');
const AuthService = require('../src/services/auth.service');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('daftar', () => {
    it('harus berhasil mendaftar pengguna baru', async () => {
      const mockData = {
        nama: 'Test User',
        email: 'test@example.com',
        no_telepon: '08123456789',
        kata_sandi: 'password123'
      };

      AuthRepository.cariPenggunaByEmailAtauTelepon.mockResolvedValue(null);
      hashPassword.mockResolvedValue('hashed_password');
      AuthRepository.buatPenggunaBaru.mockResolvedValue(1);

      const result = await AuthService.daftar(mockData);

      expect(result.id).toBe(1);
      expect(result.nama).toBe(mockData.nama);
      expect(AuthRepository.buatPenggunaBaru).toHaveBeenCalledWith({
        ...mockData,
        kata_sandi: 'hashed_password'
      });
    });

    it('harus gagal jika email sudah terdaftar', async () => {
      const mockData = { email: 'test@example.com', no_telepon: '08123' };
      AuthRepository.cariPenggunaByEmailAtauTelepon.mockResolvedValue({ email: 'test@example.com' });

      await expect(AuthService.daftar(mockData)).rejects.toThrow('Email sudah terdaftar');
    });
  });

  describe('masuk', () => {
    it('harus berhasil login dan mengembalikan token', async () => {
      const mockLogin = { email: 'test@example.com', kata_sandi: 'password123' };
      const mockUser = {
        id: 1,
        nama: 'Test',
        email: 'test@example.com',
        kata_sandi: 'hashed',
        peran: 'user',
        status_aktif: true
      };

      AuthRepository.cariPenggunaByEmail.mockResolvedValue(mockUser);
      comparePassword.mockResolvedValue(true);
      generateAccessToken.mockReturnValue('access_token');
      generateRefreshToken.mockReturnValue('refresh_token');

      const result = await AuthService.masuk(mockLogin);

      expect(result.pengguna.id).toBe(1);
      expect(result.token.access_token).toBe('access_token');
    });

    it('harus gagal jika kata sandi salah', async () => {
      AuthRepository.cariPenggunaByEmail.mockResolvedValue({ status_aktif: true });
      comparePassword.mockResolvedValue(false);

      await expect(AuthService.masuk({ email: 'a@b.com', kata_sandi: 'salah' })).rejects.toThrow('Email atau kata sandi salah');
    });
  });
});
