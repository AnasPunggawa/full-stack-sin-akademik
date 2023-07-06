import PropTypes from 'prop-types';
import BiodataUserSiswa from './BiodataUserSiswa';
import AkunUserSiswa from './AkunUserSiswa';

function SiswaDetailProfile({ DataUser }) {
  const biodataUserSiswa = {
    id: DataUser.siswa[0]?.id,
    user_id: DataUser.siswa[0]?.user_id,
    nisn: DataUser?.siswa[0]?.nisn,
    nis: DataUser?.siswa[0]?.nis,
    nama: DataUser.siswa[0]?.nama,
    alamat: DataUser.siswa[0]?.alamat,
    jenisKelamin: DataUser.siswa[0]?.jenisKelamin,
    tempatLahir: DataUser.siswa[0]?.tempatLahir,
    tanggalLahir: DataUser.siswa[0]?.tanggalLahir,
    namaAyah: DataUser?.siswa[0]?.namaAyah,
    namaIbu: DataUser?.siswa[0]?.namaIbu,
    nomorHP: DataUser.siswa[0]?.nomorHP,
    email: DataUser.siswa[0]?.email,
  };

  const dataAkunUserSiswa = {
    id: DataUser.id,
    username: DataUser.username,
    role: DataUser.role,
    password: DataUser.password,
  };

  return (
    <div className="w-full h-full p-4 space-y-4">
      {/* <Form OnSubmit={() => {}}> */}
      <BiodataUserSiswa Biodata={biodataUserSiswa} />
      <AkunUserSiswa DataAkunUserSiswa={dataAkunUserSiswa} />
      {/* </Form> */}
    </div>
  );
}

SiswaDetailProfile.propTypes = {
  DataUser: PropTypes.object,
};

export default SiswaDetailProfile;
