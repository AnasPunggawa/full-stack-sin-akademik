import PropTypes from 'prop-types';

function PageBodyInfo({ Info }) {
  const {
    // guru_id,
    kelas_id,
    // matapelajaran_id,
    matapelajaran_nama,
    nama,
    nip,
    semester_id,
  } = Info;
  // const kelas = kelas_id.split('-').join('').toUpperCase();
  const kelas = kelas_id.toUpperCase();
  const arrSemester = semester_id.split('-');
  const tahunAjaran = `${arrSemester[0]}/${arrSemester[1]}`;
  const semester = arrSemester[2].toUpperCase();
  const documentInfo = [
    { title: 'MATA PELAJARAN', value: matapelajaran_nama, style: 'text-sm' },
    { title: 'GURU', value: nama, style: 'text-sm' },
    { title: 'NIP', value: nip, style: 'text-sm' },
    { title: 'KELAS', value: kelas, style: 'text-sm' },
    { title: 'SEMESTER', value: semester, style: 'text-sm' },
    { title: 'TAHUN AJARAN', value: tahunAjaran, style: 'text-sm' },
  ];
  return (
    <table className="w-full mb-4 uppercase">
      <tbody>
        {documentInfo.map((item, index) => {
          return (
            <tr key={index}>
              <td className={item.style} width="21%">
                {item.title}
              </td>
              <td className={item.style} width="2%">
                :
              </td>
              <td className={item.style} width="77%">
                {item.value}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

PageBodyInfo.propTypes = {
  Info: PropTypes.object,
};

export default PageBodyInfo;
