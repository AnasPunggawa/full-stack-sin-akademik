import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../../components/form/InputField';
import Button from '../../../../components/ui/Button';
import DatePick from '../../../../components/ui/DatePick';

function BiodataUserAdmin({ Biodata }) {
  const {
    nama,
    jenisKelamin,
    alamat,
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
          Biodata Admin
        </h3>
        <Button OnClick={() => handleEdit()} ButtonStyle="LINK_PRIMARY">
          Edit
        </Button>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* NAMA ADMIN */}
        <InputField
          HtmlFor="nama-admin"
          Type="text"
          Value={nama}
          Placeholder={nama}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nama Admin
        </InputField>
        {/* ALAMAT ADMIN */}
        <InputField
          HtmlFor="alamat-admin"
          Type="text"
          Value={alamat}
          Placeholder={alamat}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Alamat Admin
        </InputField>
        {/* JENIS KELAMIN ADMIN */}
        <InputField
          HtmlFor="jenis-kelamin-admin"
          Type="text"
          Value={jenisKelamin}
          Placeholder={jenisKelamin}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Jenis Kelamin Admin
        </InputField>
        {/* TEMPAT LAHIR ADMIN */}
        <InputField
          HtmlFor="tempat-lahir-admin"
          Type="text"
          Value={tempatLahir}
          Placeholder={tempatLahir}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Tempat Lahir Admin
        </InputField>
        {/* TANGGAL LAHIR ADMIN */}
        <DatePick
          HtmlFor={'tanggal-lahir-admin'}
          Value={formatDate}
          Required={true}
          AutoComplete="OFF"
          Placeholder={formatDate.toString()}
          Disabled={true}
          OnChange={() => {}}
        >
          Tanggal Lahir Admin
        </DatePick>
        {/* EMAIL ADMIN */}
        <InputField
          HtmlFor="email-admin"
          Type="text"
          Value={email}
          Placeholder={email}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Email Admin
        </InputField>
        {/* NOMOR HP ADMIN */}
        <InputField
          HtmlFor="nomor-hp-admin"
          Type="text"
          Value={nomorHP}
          Placeholder={nomorHP}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nomor HP Admin
        </InputField>
      </div>
    </div>
  );
}

BiodataUserAdmin.propTypes = {
  Biodata: PropTypes.object,
};

export default BiodataUserAdmin;
