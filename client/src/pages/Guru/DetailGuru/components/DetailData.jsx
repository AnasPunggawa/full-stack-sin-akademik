import PropTypes from 'prop-types';
// import Form from '../../../../components/form/Form';
import BiodataGuru from './BiodataGuru';
import DataAkunGuru from './DataAkunGuru';
import TableDataMataPelajaran from './TableDataMataPelajaran';

function DetailData({ DataGuru }) {
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
      {/* <Form OnSubmit={() => {}}> */}
      <BiodataGuru Biodata={biodataGuru} />
      <DataAkunGuru dataAkunGuru={dataAkunGuru} />
      <TableDataMataPelajaran DataMataPelajaran={dataMataPelajaran} />
      {/* </Form> */}
    </div>
  );
}

DetailData.propTypes = {
  DataGuru: PropTypes.object,
};

export default DetailData;
