function generateKelasID(kelas, kode) {
  return `${kelas}-${kode.toLowerCase()}`;
}

function generateKodeKelas(kelas, kode) {
  return kelas + kode.toUpperCase();
}

module.exports = {
  generateKodeKelas,
  generateKelasID,
};
