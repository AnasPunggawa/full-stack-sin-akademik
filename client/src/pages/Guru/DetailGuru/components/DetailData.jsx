import PropTypes from 'prop-types';
// import Form from '../../../../components/form/Form';
import BiodataGuru from './BiodataGuru';
import AkunGuru from './AkunGuru';
import TableDataMataPelajaran from './TableDataMataPelajaran';
import { useLocation } from 'react-router-dom';
import BoxSuccess from '../../../../components/ui/BoxSuccess';
import BoxError from '../../../../components/ui/BoxError';

function DetailData({ DataGuru }) {
  const { state } = useLocation();

  const biodataGuru = {
    id: DataGuru?.id,
    user_id: DataGuru?.user_id,
    nama: DataGuru?.nama,
    nip: DataGuru?.nip,
    alamat: DataGuru?.alamat,
    jenisKelamin: DataGuru?.jenisKelamin,
    tempatLahir: DataGuru?.tempatLahir,
    tanggalLahir: DataGuru?.tanggalLahir,
    email: DataGuru?.email,
    nomorHP: DataGuru?.nomorHP,
    status: DataGuru?.status,
  };
  const dataAkunGuru = {
    id: DataGuru?.users?.id,
    guru_id: DataGuru?.id,
    username: DataGuru?.users?.username,
    role: DataGuru?.users?.role,
    password: DataGuru?.users?.password,
  };
  const dataMataPelajaran = DataGuru?.matapelajaran;

  return (
    <div className="w-full h-full p-4 space-y-4">
      {state && !state?.success && <BoxError>{state?.message}</BoxError>}
      {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
      {/* <Form OnSubmit={() => {}}> */}
      <BiodataGuru Biodata={biodataGuru} />
      <AkunGuru DataAkunGuru={dataAkunGuru} />
      <TableDataMataPelajaran DataMataPelajaran={dataMataPelajaran} />
      {/* </Form> */}
    </div>
  );
}

DetailData.propTypes = {
  DataGuru: PropTypes.object,
};

export default DetailData;
