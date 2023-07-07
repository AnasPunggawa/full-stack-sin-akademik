function generateGuruID(nip, nama) {
  const namaHyphen = nama.toLowerCase().replace(/ /g, '-');
  return `${nip}-${namaHyphen}`;
}

function generateStatusGuru(status) {
  if (status === 'aktif' || status === 'true' || status === true) return true;
  if (status === 'nonaktif' || status === 'false' || status === false)
    return false;
  return true;
}

module.exports = { generateGuruID, generateStatusGuru };
