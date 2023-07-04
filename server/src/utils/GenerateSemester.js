function validateTahunAjaran(tahunAjaran) {
  const arrTahunAjaran = tahunAjaran.split('/').map(function (tahun, index) {
    return parseInt(tahun);
  });
  if (
    arrTahunAjaran[0] < arrTahunAjaran[1] &&
    arrTahunAjaran[1] - arrTahunAjaran[0] === 1
  )
    return true;
  return false;
}

function generateSemesterID(tahunAjaran, semester) {
  const tahunAjaranHyphen = tahunAjaran.replace('/', '-');
  return `${tahunAjaranHyphen}-${semester.toLowerCase()}`;
}

function generateKodeSemester(tahunAjaran, semester) {
  return `${tahunAjaran}-${semester.toLowerCase()}`;
}

function generateStatusSemester(status) {
  if (status === 'aktif' || status === 'true' || status === true) return true;
  if (status === 'nonaktif' || status === 'false' || status === false)
    return false;
  return true;
}

module.exports = {
  validateTahunAjaran,
  generateSemesterID,
  generateKodeSemester,
  generateStatusSemester,
};
