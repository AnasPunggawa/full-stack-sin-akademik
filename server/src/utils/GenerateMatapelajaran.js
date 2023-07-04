function generateMatapelajaranID(nama) {
  const namaMatapelajaran = nama.toLowerCase();
  return `mapel-${namaMatapelajaran.replace(/ /g, '-')}`;
}

module.exports = { generateMatapelajaranID };
