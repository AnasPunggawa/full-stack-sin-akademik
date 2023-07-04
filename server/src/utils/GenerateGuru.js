function generateGuruID(nip, nama) {
  const namaHyphen = nama.toLowerCase().replace(/ /g, '-');
  return `${nip}-${namaHyphen}`;
}

module.exports = { generateGuruID };
