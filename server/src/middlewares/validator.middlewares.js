const CustomError = require('../utils/CustomError');
const { generateGuruID } = require('../utils/GenerateGuru');
const {
  generateKodeKelas,
  generateKelasID,
} = require('../utils/GenerateKelas');
const { generateMatapelajaranID } = require('../utils/GenerateMatapelajaran');
const { generateNilaiID } = require('../utils/GenerateNilai');
const {
  generateKodeSemester,
  generateStatusSemester,
  validateTahunAjaran,
  generateSemesterID,
} = require('../utils/GenerateSemester');
const { generateSiswaID } = require('../utils/GenerateSiswa');
const { getCurrentDate } = require('../utils/GenerateTime');
const {
  containsWhitespace,
  containsOnlyNumbers,
  validateEmail,
  validateGanjilGenap,
  containsOnlyString,
} = require('../utils/RegExp');

function validateRoles(req, res, next) {
  const { role } = req.body;

  if (!role) throw new CustomError(400, 'role harus diisi');
  req.role = {
    id: role.toLowerCase(),
    role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
  };
  next();
}

function validateUsers(req, res, next) {
  const { username, password, role } = req.body;

  if (!username) throw new CustomError(400, 'username harus diisi');
  if (containsWhitespace(username))
    throw new CustomError(400, 'username tidak boleh mengandung spasi');
  if (username.length < 5)
    throw new CustomError(400, 'username minimal terdiri dari 5 karakter');
  if (!password) throw new CustomError(400, 'password harus diisi');
  if (password.length < 8)
    throw new CustomError(400, 'password minimal terdiri dari 8 karakter');
  if (!role) throw new CustomError(400, 'role harus diisi');

  req.user = {
    username,
    password,
    role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
  };
  next();
}

function validateAdmin(req, res, next) {
  const {
    nama,
    user_id,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    alamat,
    email,
    nomorHP,
  } = req.body;

  if (!nama) throw new CustomError(400, 'nama harus diisi');
  if (nama.length < 3)
    throw new CustomError(400, 'nama minimal terdiri dari 3 karakter');
  if (!user_id) throw new CustomError(400, 'user_id harus diisi');
  if (!jenisKelamin) throw new CustomError(400, 'jenis kelamin harus diisi');
  if (!tempatLahir) throw new CustomError(400, 'tempat lahir harus diisi');
  if (!alamat) throw new CustomError(400, 'alamat harus diisi');
  if (!email) throw new CustomError(400, 'email harus diisi');
  if (!validateEmail(email)) throw new CustomError(400, 'email tidak valid');
  if (!nomorHP) throw new CustomError(400, 'nomor HP harus diisi');
  if (nomorHP.length < 10 || !containsOnlyNumbers(nomorHP))
    throw new CustomError(400, 'nomor HP tidak valid');

  req.admin = {
    nama,
    user_id,
    jenisKelamin,
    tempatLahir,
    tanggalLahir: tanggalLahir || new Date(),
    alamat,
    email,
    nomorHP,
  };

  next();
}

function validateGuru(req, res, next) {
  const {
    user_id,
    nama,
    nip,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    alamat,
    email,
    nomorHP,
  } = req.body;

  if (!user_id) throw new CustomError(400, 'user_id harus diisi');
  if (!nama) throw new CustomError(400, 'nama harus diisi');
  if (nama.length < 3)
    throw new CustomError(400, 'nama minimal terdiri dari 3 karakter');
  if (!nip) throw new CustomError(400, 'nip harus diisi');
  if (!containsOnlyNumbers(nip))
    throw new CustomError(400, 'nip harus berupa angka');
  if (!jenisKelamin) throw new CustomError(400, 'jenis kelamin harus diisi');
  if (!tempatLahir) throw new CustomError(400, 'tempat lahir harus diisi');
  if (!alamat) throw new CustomError(400, 'alamat harus diisi');
  if (!email) throw new CustomError(400, 'email harus diisi');
  if (!validateEmail(email)) throw new CustomError(400, 'email tidak valid');
  if (!nomorHP) throw new CustomError(400, 'nomor HP harus diisi');
  if (nomorHP.length < 10 || !containsOnlyNumbers(nomorHP))
    throw new CustomError(400, 'nomor HP tidak valid');

  req.guru = {
    id: generateGuruID(nama, nip),
    user_id,
    nama,
    nip,
    jenisKelamin,
    tempatLahir,
    tanggalLahir: tanggalLahir || new Date(),
    alamat,
    email,
    nomorHP,
  };

  next();
}

function validateSiswa(req, res, next) {
  const {
    user_id,
    nama,
    nisn,
    nis,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    namaAyah,
    namaIbu,
    alamat,
    email,
    nomorHP,
  } = req.body;

  if (!user_id) throw new CustomError(400, 'user_id harus diisi');
  if (!nama) throw new CustomError(400, 'nama harus diisi');
  if (nama.length < 3)
    throw new CustomError(400, 'nama minimal terdiri dari 3 karakter');
  if (!nisn) throw new CustomError(400, 'nisn harus diisi');
  if (!containsOnlyNumbers(nisn))
    throw new CustomError(400, 'nisn harus berupa angka');
  if (!nis) throw new CustomError(400, 'nis harus diisi');
  if (!containsOnlyNumbers(nis))
    throw new CustomError(400, 'nis harus berupa angka');
  if (!jenisKelamin) throw new CustomError(400, 'jenis kelamin harus diisi');
  if (!tempatLahir) throw new CustomError(400, 'tempat lahir harus diisi');
  if (!namaAyah) throw new CustomError(400, 'nama ayah siswa harus diisi');
  if (!namaIbu) throw new CustomError(400, 'nama ibu siswa harus diisi');
  if (!alamat) throw new CustomError(400, 'alamat harus diisi');
  if (!email) throw new CustomError(400, 'email harus diisi');
  if (!validateEmail(email)) throw new CustomError(400, 'email tidak valid');
  if (nomorHP.length < 10 || !containsOnlyNumbers(nomorHP))
    throw new CustomError(400, 'nomor HP tidak valid');

  req.siswa = {
    id: generateSiswaID(nama, nisn),
    user_id,
    nama,
    nisn,
    nis,
    jenisKelamin,
    tempatLahir,
    tanggalLahir: tanggalLahir || new Date(),
    namaAyah,
    namaIbu,
    alamat,
    email,
    nomorHP,
  };

  next();
}

function validateSemester(req, res, next) {
  const { kodeSemester, tahunAjaran, semester, status } = req.body;

  if (!tahunAjaran) throw new CustomError(400, 'tahun ajaran harus diisi');
  if (!validateTahunAjaran(tahunAjaran))
    throw new CustomError(400, 'tahun ajaran tidak valid');
  if (!semester) throw new CustomError(400, 'semester harus diisi');
  if (!validateGanjilGenap(semester))
    throw new CustomError(400, 'semester tidak valid');

  req.semester = {
    id: generateSemesterID(tahunAjaran, semester),
    kodeSemester: generateKodeSemester(tahunAjaran, semester),
    tahunAjaran: tahunAjaran,
    semester: semester.toLowerCase(),
    status: generateStatusSemester(status),
  };

  next();
}

function validateKelas(req, res, next) {
  const { kelas, kode } = req.body;

  if (!kelas) throw new CustomError(400, 'kelas harus diisi');
  if (kelas.length !== 1 || !containsOnlyNumbers(kelas))
    throw new CustomError(400, 'kelas tidak valid');
  if (!kode) throw new CustomError(400, 'kelas harus diisi');
  if (kode.length !== 1 || containsOnlyNumbers(kode))
    throw new CustomError(400, 'kode tidak valid');

  req.kelas = {
    id: generateKelasID(kelas, kode),
    kodeKelas: generateKodeKelas(kelas, kode),
    kelas,
    kode: kode.toUpperCase(),
  };

  next();
}

function validateMatapelajaran(req, res, next) {
  const { nama } = req.body;

  if (!nama) throw new CustomError(400, 'nama mata pelajaran harus diisi');
  if (!containsOnlyString(nama))
    throw new CustomError(400, 'nama mata pelajaran tidak valid');

  req.matapelajaran = {
    id: generateMatapelajaranID(nama),
    nama: nama.toUpperCase(),
  };

  next();
}

function validateNilai(req, res, next) {
  const {
    siswa_id,
    semester_id,
    kelas_id,
    matapelajaran_id,
    nilai,
    predikat,
    catatan,
  } = req.body;

  if (!siswa_id) throw new CustomError(400, 'siswa harus diisi');
  if (!semester_id) throw new CustomError(400, 'semester harus diisi');
  if (!kelas_id) throw new CustomError(400, 'kelas harus diisi');
  if (!matapelajaran_id)
    throw new CustomError(400, 'mata pelajaran harus diisi');
  if (!containsOnlyNumbers(nilai) || nilai > 100)
    throw new CustomError(400, 'nilai tidak valid');
  if (!predikat) throw new CustomError(400, 'predikat harus diisi');
  if (predikat.length !== 1 || !containsOnlyString(predikat))
    throw new CustomError(400, 'predikat tidak valid');
  if (!catatan) throw new CustomError(400, 'catatan harus diisi');

  req.nilai = {
    id: generateNilaiID(siswa_id, semester_id, kelas_id, matapelajaran_id),
    siswa_id,
    semester_id,
    kelas_id,
    matapelajaran_id,
    nilai,
    predikat: predikat.toUpperCase(),
    catatan,
    tanggal: getCurrentDate(),
  };

  next();
}

module.exports = {
  validateRoles,
  validateUsers,
  validateAdmin,
  validateGuru,
  validateSiswa,
  validateSemester,
  validateKelas,
  validateMatapelajaran,
  validateNilai,
};
