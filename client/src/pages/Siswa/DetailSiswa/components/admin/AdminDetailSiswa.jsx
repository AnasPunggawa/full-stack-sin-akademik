import PropTypes from 'prop-types';
import BiodataSiswa from './BiodataSiswa';
import AkunSiswa from './AkunSiswa';
import BoxError from '../../../../../components/ui/BoxError';
import BoxSuccess from '../../../../../components/ui/BoxSuccess';
import { useLocation } from 'react-router-dom';

function AdminDetailaSiswa({ DataSiswa }) {
  const { state } = useLocation();

  const biodataSiswa = {
    id: DataSiswa?.id,
    user_id: DataSiswa?.user_id,
    nama: DataSiswa?.nama,
    nisn: DataSiswa?.nisn,
    nis: DataSiswa?.nis,
    alamat: DataSiswa?.alamat,
    jenisKelamin: DataSiswa?.jenisKelamin,
    tempatLahir: DataSiswa?.tempatLahir,
    tanggalLahir: DataSiswa?.tanggalLahir,
    namaAyah: DataSiswa?.namaAyah,
    namaIbu: DataSiswa?.namaIbu,
    email: DataSiswa?.email,
    nomorHP: DataSiswa?.nomorHP,
    tahunAngkatan: DataSiswa?.tahunAngkatan,
    status: DataSiswa?.status,
  };

  const dataAkunSiswa = {
    id: DataSiswa?.users?.id,
    siswa_id: DataSiswa?.id,
    username: DataSiswa?.users?.username,
    role: DataSiswa?.users?.role,
    password: DataSiswa?.users?.password,
  };

  return (
    <div className="w-full h-full p-4 space-y-4">
      {/* <Form OnSubmit={() => {}}> */}
      {state && !state?.success && <BoxError>{state?.message}</BoxError>}
      {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
      <BiodataSiswa Biodata={biodataSiswa} />
      <AkunSiswa DataAkunSiswa={dataAkunSiswa} />
      {/* </Form> */}
    </div>
  );
}

AdminDetailaSiswa.propTypes = {
  DataSiswa: PropTypes.object,
};

export default AdminDetailaSiswa;
