function generateSiswaID(nisn, nama) {
  const namaHyphen = nama.toLowerCase().replace(/ /g, '-');
  return `${nisn}-${namaHyphen}`;
}

module.exports = { generateSiswaID };
