import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import InputField from '../../../../components/form/InputField';
import DatePick from '../../../../components/ui/DatePick';

function BiodataUserGuru({ Biodata }) {
  const {
    nama,
    nip,
    alamat,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    email,
    nomorHP,
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
          Nama Guru
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
          NIP Guru
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
          Alamat Guru
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
          Jenis Kelamin Guru
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
          Tempat Lahir Guru
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
          Tanggal Lahir Guru
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
          Email Guru
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
          Nomor HP Guru
        </InputField>
      </div>
    </div>
  );
}

BiodataUserGuru.propTypes = {
  Biodata: PropTypes.object,
};

export default BiodataUserGuru;
