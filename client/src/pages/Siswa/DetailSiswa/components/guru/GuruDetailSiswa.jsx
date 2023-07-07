import PropTypes from 'prop-types';
import BiodataSiswa from './BiodataSiswa';

function GuruDetailSiswa({ DataSiswa }) {
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
  return (
    <div className="w-full h-full p-4 space-y-4">
      {/* <Form OnSubmit={() => {}}> */}
      <BiodataSiswa Biodata={biodataSiswa} />
      {/* </Form> */}
    </div>
  );
}

GuruDetailSiswa.propTypes = {
  DataSiswa: PropTypes.object,
};

export default GuruDetailSiswa;
