import PropTypes from 'prop-types';
import BiodataSiswa from './BiodataSiswa';
import AkunSiswa from './AkunSiswa';

function AdminDetailaSiswa({ DataSiswa }) {
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
