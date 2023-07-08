import PropTypes from 'prop-types';
import NilaiSiswa from './NilaiSiswa';
// import Form from '../../../../components/form/Form';

function DetailData({ DataNilai }) {
  const { siswa, semester, kelas, matapelajaran, guru } = DataNilai;
  const nilai = {
    namaSiswa: siswa?.nama,
    nisnSiswa: siswa?.nisn,
    namaGuru: guru?.nama,
    nipGuru: guru?.nip,
    semester: semester?.kodeSemester,
    kelas: kelas?.kodeKelas,
    mataPelajaran: matapelajaran?.nama,
    nilai: DataNilai?.nilai,
    predikat: DataNilai?.predikat,
    catatan: DataNilai?.catatan,
    statusSemester: semester?.status,
  };
  return (
    <div className="w-full h-full p-4 space-y-4">
      {/* <Form OnSubmit={() => {}}> */}
      <NilaiSiswa Nilai={nilai} />
      {/* </Form> */}
    </div>
  );
}

DetailData.propTypes = {
  DataNilai: PropTypes.object,
};

export default DetailData;
