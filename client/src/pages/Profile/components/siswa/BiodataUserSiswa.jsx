import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import InputField from '../../../../components/form/InputField';
import DatePick from '../../../../components/ui/DatePick';

function BiodataUserSiswa({ Biodata }) {
  const {
    nama,
    nisn,
    nis,
    alamat,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    namaAyah,
    namaIbu,
    email,
    nomorHP,
    tahunAngkatan,
    status,
  } = Biodata;

  const formatDate = new Date(tanggalLahir);

  const navigate = useNavigate();

  function handleEdit() {
    navigate('edit-biodata');
  }

  return (
    <div className="border-b-2 border-gray-300 dark:border-gray-500">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
          Biodata Siswa
        </h2>
        <Button OnClick={() => handleEdit()} ButtonStyle="LINK_PRIMARY">
          Edit
        </Button>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* NAMA SISWA */}
        <InputField
          HtmlFor="nama-siswa"
          Type="text"
          Value={nama}
          Placeholder={nama}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nama
        </InputField>
        {/* NISN SISWA */}
        <InputField
          HtmlFor="nisn-siswa"
          Type="text"
          Value={nisn}
          Placeholder={nisn}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          NISN
        </InputField>
        {/* NIS SISWA */}
        <InputField
          HtmlFor="nis-siswa"
          Type="text"
          Value={nis}
          Placeholder={nis}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          NIS
        </InputField>
        {/* ALAMAT SISWA */}
        <InputField
          HtmlFor="alamat-siswa"
          Type="text"
          Value={alamat}
          Placeholder={alamat}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Alamat
        </InputField>
        {/* JENIS KELAMIN SISWA */}
        <InputField
          HtmlFor="jenis-kelamin-siswa"
          Type="text"
          Value={jenisKelamin}
          Placeholder={jenisKelamin}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Jenis Kelamin
        </InputField>
        {/* TEMPAT LAHIR SISWA */}
        <InputField
          HtmlFor="tempat-lahir-siswa"
          Type="text"
          Value={tempatLahir}
          Placeholder={tempatLahir}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Tempat Lahir
        </InputField>
        {/* TANGGAL LAHIR SISWA */}
        <DatePick
          HtmlFor={'tanggal-lahir'}
          Value={formatDate}
          Required={true}
          AutoComplete="OFF"
          Placeholder={formatDate.toString()}
          Disabled={true}
          OnChange={() => {}}
        >
          Tanggal Lahir
        </DatePick>
        {/* NAMA AYAH SISWA */}
        <InputField
          HtmlFor="nama-ayah-siswa"
          Type="text"
          Value={namaAyah}
          Placeholder={namaAyah}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nama Ayah
        </InputField>
        {/* NAMA IBU SISWA */}
        <InputField
          HtmlFor="nama-ibu-siswa"
          Type="text"
          Value={namaIbu}
          Placeholder={namaIbu}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nama Ibu
        </InputField>
        {/* EMAIL SISWA */}
        <InputField
          HtmlFor="email-siswa"
          Type="text"
          Value={email}
          Placeholder={email}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Email
        </InputField>
        {/* NOMOR HP SISWA */}
        <InputField
          HtmlFor="nomor-hp-siswa"
          Type="text"
          Value={nomorHP}
          Placeholder={nomorHP}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nomor HP
        </InputField>
        {/* TAHUN ANGKATAN SISWA */}
        <InputField
          HtmlFor="tahun-angkatan-siswa"
          Type="text"
          Value={tahunAngkatan}
          Placeholder={tahunAngkatan}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Tahun Angkatan
        </InputField>
        {/* STATUS SISWA */}
        <InputField
          HtmlFor="status-siswa"
          Type="text"
          Value={status ? 'Aktif' : 'Tidak Aktif'}
          Placeholder={status ? 'Aktif' : 'Tidak Aktif'}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Status
        </InputField>
      </div>
    </div>
  );
}

BiodataUserSiswa.propTypes = {
  Biodata: PropTypes.object,
};

export default BiodataUserSiswa;
