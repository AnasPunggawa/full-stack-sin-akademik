function generateNilaiID(siswa_id, semester_id, kelas_id, matapelajaran_id) {
  const nisn = siswa_id.split('-').slice(0, 1);
  return `${nisn}-${semester_id}-${kelas_id}-${matapelajaran_id}`;
}

module.exports = {
  generateNilaiID,
};
