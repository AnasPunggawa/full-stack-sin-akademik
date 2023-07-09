import PropTypes from 'prop-types';
import BiodataUserGuru from './BiodataUserGuru';
import AkunUserGuru from './AkunUserGuru';
import TableDataMataPelajaranGuru from './TableDataMataPelajaranGuru';
import { useLocation } from 'react-router-dom';
import BoxError from '../../../../components/ui/BoxError';
import BoxSuccess from '../../../../components/ui/BoxSuccess';

function GuruDetailProfile({ DataUser }) {
  const { state } = useLocation();

  const biodataUserGuru = {
    id: DataUser.guru[0]?.id,
    user_id: DataUser.guru[0]?.user_id,
    nip: DataUser.guru[0]?.nip,
    nama: DataUser.guru[0]?.nama,
    alamat: DataUser.guru[0]?.alamat,
    jenisKelamin: DataUser.guru[0]?.jenisKelamin,
    tempatLahir: DataUser.guru[0]?.tempatLahir,
    tanggalLahir: DataUser.guru[0]?.tanggalLahir,
    nomorHP: DataUser.guru[0]?.nomorHP,
    email: DataUser.guru[0]?.email,
    status: DataUser.guru[0]?.status,
  };

  const dataAkunUserGuru = {
    id: DataUser.id,
    username: DataUser.username,
    role: DataUser.role,
    password: DataUser.password,
  };

  const dataMataPelajaranGuru = DataUser?.guru[0]?.matapelajaran;

  return (
    <div className="w-full h-full p-4 space-y-4">
      {/* <Form OnSubmit={() => {}}> */}
      {state && !state?.success && <BoxError>{state?.message}</BoxError>}
      {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
      <BiodataUserGuru Biodata={biodataUserGuru} />
      <AkunUserGuru DataAkunUserGuru={dataAkunUserGuru} />
      <TableDataMataPelajaranGuru
        DataMataPelajaranGuru={dataMataPelajaranGuru}
      />
      {/* </Form> */}
    </div>
  );
}

GuruDetailProfile.propTypes = {
  DataUser: PropTypes.object,
};

export default GuruDetailProfile;
