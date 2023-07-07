import PropTypes from 'prop-types';
import InputField from '../../../../components/form/InputField';
import Button from '../../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import DatePick from '../../../../components/ui/DatePick';

function BiodataGuru({ Biodata }) {
  const {
    nama,
    nip,
    alamat,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    email,
    nomorHP,
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
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
          Biodata Guru
        </h3>
        <Button OnClick={() => handleEdit()} ButtonStyle="LINK_PRIMARY">
          Edit
        </Button>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* NAMA GURU */}
        <InputField
          HtmlFor="nama-guru"
          Type="text"
          Value={nama}
          Placeholder={nama}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nama
        </InputField>
        {/* NIP GURU */}
        <InputField
          HtmlFor="nip-guru"
          Type="text"
          Value={nip}
          Placeholder={nip}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          NIP
        </InputField>
        {/* ALAMAT GURU */}
        <InputField
          HtmlFor="alamat-guru"
          Type="text"
          Value={alamat}
          Placeholder={alamat}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Alamat
        </InputField>
        {/* JENIS KELAMIN GURU */}
        <InputField
          HtmlFor="jenis-kelamin-guru"
          Type="text"
          Value={jenisKelamin}
          Placeholder={jenisKelamin}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Jenis Kelamin
        </InputField>
        {/* TEMPAT LAHIR GURU */}
        <InputField
          HtmlFor="tempat-lahir-guru"
          Type="text"
          Value={tempatLahir}
          Placeholder={tempatLahir}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Tempat Lahir
        </InputField>
        {/* TANGGAL LAHIR GURU */}
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
        {/* EMAIL GURU */}
        <InputField
          HtmlFor="email-guru"
          Type="text"
          Value={email}
          Placeholder={email}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Email
        </InputField>
        {/* NOMOR HP GURU */}
        <InputField
          HtmlFor="nomor-hp-guru"
          Type="text"
          Value={nomorHP}
          Placeholder={nomorHP}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nomor HP
        </InputField>
        {/* STATUS GURU */}
        <InputField
          HtmlFor="status-guru"
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

BiodataGuru.propTypes = {
  Biodata: PropTypes.object,
};

export default BiodataGuru;
