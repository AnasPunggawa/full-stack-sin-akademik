function generateSiswaID(nisn, nama) {
  const namaHyphen = nama.toLowerCase().replace(/ /g, '-');
  return `${nisn}-${namaHyphen}`;
}

function generateStatusSiswa(status) {
  if (status === 'aktif' || status === 'true' || status === true) return true;
  if (status === 'nonaktif' || status === 'false' || status === false)
    return false;
  return true;
}

module.exports = { generateSiswaID, generateStatusSiswa };
