import PropTypes from 'prop-types';
import NilaiSiswa from './NilaiSiswa';
import { useLocation } from 'react-router-dom';
import BoxSuccess from '../../../../components/ui/BoxSuccess';
import BoxError from '../../../../components/ui/BoxError';
// import Form from '../../../../components/form/Form';

function DetailData({ DataNilai }) {
  const { state } = useLocation();
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
  console.log(state && !state?.success);
  return (
    <div className="w-full h-full p-4 space-y-4">
      {/* <Form OnSubmit={() => {}}> */}
      {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
      {state && !state?.success && <BoxError>{state?.message}</BoxError>}
      <NilaiSiswa Nilai={nilai} />
      {/* </Form> */}
    </div>
  );
}

DetailData.propTypes = {
  DataNilai: PropTypes.object,
};

export default DetailData;
