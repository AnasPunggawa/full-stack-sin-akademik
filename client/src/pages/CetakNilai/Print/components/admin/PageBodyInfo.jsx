import PropTypes from 'prop-types';

function PageBodyInfo({ Info }) {
  const { nama_siswa, nis_siswa, nisn_siswa, kelas_id, semester_id } = Info;
  const kelas = kelas_id.split('-').join('').toUpperCase();
  const arrSemester = semester_id.split('-');
  const tahunAjaran = `${arrSemester[0]}/${arrSemester[1]}`;
  const semester = arrSemester[2].toUpperCase();
  const documentInfo = [
    { title: 'Nama', value: nama_siswa.toUpperCase(), style: 'text-sm' },
    { title: 'NIS', value: nis_siswa, style: 'text-sm' },
    { title: 'NISN', value: nisn_siswa, style: 'text-sm' },
    { title: 'KELAS', value: kelas, style: 'text-sm' },
    { title: 'SEMESTER', value: semester, style: 'text-sm' },
    { title: 'TAHUN AJARAN', value: tahunAjaran, style: 'text-sm' },
  ];
  return (
    <table className="w-full mb-4">
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
