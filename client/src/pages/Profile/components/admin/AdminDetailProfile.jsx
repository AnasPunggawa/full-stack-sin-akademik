import PropTypes from 'prop-types';
import BiodataUserAdmin from './BiodataUserAdmin';
import AkunUserAdmin from './AkunUserAdmin';
import { useLocation } from 'react-router-dom';
import BoxError from '../../../../components/ui/BoxError';
import BoxSuccess from '../../../../components/ui/BoxSuccess';

function AdminDetailProfile({ DataUser }) {
  const { state } = useLocation();

  const biodataUserAdmin = {
    id: DataUser.admin[0]?.id,
    user_id: DataUser.admin[0]?.user_id,
    nama: DataUser.admin[0]?.nama,
    alamat: DataUser.admin[0]?.alamat,
    jenisKelamin: DataUser.admin[0]?.jenisKelamin,
    tempatLahir: DataUser.admin[0]?.tempatLahir,
    tanggalLahir: DataUser.admin[0]?.tanggalLahir,
    nomorHP: DataUser.admin[0]?.nomorHP,
    email: DataUser.admin[0]?.email,
  };

  const dataAkunUserAdmin = {
    id: DataUser.id,
    username: DataUser.username,
    role: DataUser.role,
    password: DataUser.password,
  };

  return (
    <div className="w-full h-full p-4 space-y-4">
      {state && !state?.success && <BoxError>{state?.message}</BoxError>}
      {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
      {/* <Form OnSubmit={() => {}}> */}
      <BiodataUserAdmin Biodata={biodataUserAdmin} />
      <AkunUserAdmin DataAkunUserAdmin={dataAkunUserAdmin} />
      {/* </Form> */}
    </div>
  );
}

AdminDetailProfile.propTypes = {
  DataUser: PropTypes.object,
};

export default AdminDetailProfile;
