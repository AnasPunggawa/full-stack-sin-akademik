import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoxError from '../../../../../components/ui/BoxError';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import InputRequired from '../../../../../components/form/InputRequired';
import InputSelect from '../../../../../components/form/InputSelect';
import DatePick from '../../../../../components/ui/DatePick';
import Button from '../../../../../components/ui/Button';
import { updateAdmin } from '../../../../../api/admin';
import { JENIS_KELAMIN } from '../../../../../config/jenisKelamin';

// const JENIS_KELAMIN = [
//   {
//     id: 'Laki-laki',
//     name: 'Laki-laki',
//   },
//   {
//     id: 'Perempuan',
//     name: 'Perempuan',
//   },
// ];

function EditDataAdmin({ BiodataAdmin }) {
  const {
    id,
    user_id,
    nama: currentNama,
    jenisKelamin: currentJenisKelamin,
    alamat: currentAlamat,
    tempatLahir: currentTempatLahir,
    tanggalLahir: currentTanggalLahir,
    email: currentEmail,
    nomorHP: currentNomorHP,
  } = BiodataAdmin;

  const formatCurrentTanggalLahir = new Date(
    currentTanggalLahir
  ).toLocaleDateString('id-ID');

  const [nama, setNama] = useState(currentNama);
  const [jenisKelamin, setJenisKelamin] = useState(currentJenisKelamin);
  const [tempatLahir, setTempatLahir] = useState(currentTempatLahir);
  const [tanggalLahir, setTanggalLahir] = useState(
    new Date(currentTanggalLahir)
  );
  const [alamat, setAlamat] = useState(currentAlamat);
  const [email, setEmail] = useState(currentEmail);
  const [nomorHP, setNomorHP] = useState(currentNomorHP);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function handleUpdateAdmin(formData) {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      await updateAdmin(id, formData);
      // const response = await updateAdmin(id, formData);
      // const data = response.data.data;
      // console.log(data);
      // console.log('updated biodata siswa');
      navigate('/profile', {
        state: { success: true, message: 'Berhasil mengubah biodata' },
        replace: true,
      });
    } catch (error) {
      setIsError(true);
      if (error.response.data.status === 500)
        return setErrorMessage('Something went wrong');
      if (error.response) return setErrorMessage(error.response.data.message);
      return setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  function submitEditBiodataAdmin(e) {
    e.preventDefault();
    if (!checkInput()) return setIsError(true);
    const formData = {
      ...BiodataAdmin,
      user_id,
      nama,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamat,
      email,
      nomorHP,
    };
    // console.log(formData);
    handleUpdateAdmin(formData);
    return;
  }

  function checkInput() {
    if (nama === '') {
      setErrorMessage('Nama harus diisi');
      return false;
    }
    if (alamat === '') {
      setErrorMessage('Alamat harus diisi');
      return false;
    }
    if (jenisKelamin === '') {
      setErrorMessage('Jenis kelamin harus diisi');
      return false;
    }
    if (tempatLahir === '') {
      setErrorMessage('Tempat lahir harus diisi');
      return false;
    }
    if (tanggalLahir === null) {
      setErrorMessage('Tanggal lahir harus diisi');
      return false;
    }
    if (email === '') {
      setErrorMessage('Email harus diisi');
      return false;
    }
    if (nomorHP === '') {
      setErrorMessage('Nomor HP harus diisi');
      return false;
    }
    return true;
  }

  useEffect(() => {
    setIsError(false);
    setErrorMessage('');
    return;
  }, [nama, alamat, jenisKelamin, tempatLahir, tanggalLahir, email, nomorHP]);

  useEffect(() => {
    if (
      nama === '' ||
      alamat === '' ||
      jenisKelamin === '' ||
      tempatLahir === '' ||
      tanggalLahir === null ||
      email === '' ||
      nomorHP === '' ||
      isError
    )
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [
    nama,
    alamat,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    email,
    nomorHP,
    isError,
  ]);

  function cancelEditBiodataAdmin() {
    navigate(`/profile`);
  }

  return (
    <div className="w-full h-full p-4 space-y-4 md:space-y-6">
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      <Form OnSubmit={(e) => submitEditBiodataAdmin(e)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* NAMA ADMIN */}
          <InputField
            HtmlFor="nama-admin"
            Type="text"
            Value={nama}
            Placeholder={currentNama}
            Required={true}
            OnChange={(e) => setNama(e.target.value)}
          >
            Nama Admin
            <InputRequired />
          </InputField>
          {/* ALAMAT ADMIN */}
          <InputField
            HtmlFor="alamat-admin"
            Type="text"
            Value={alamat}
            Placeholder={currentAlamat}
            Required={true}
            OnChange={(e) => setAlamat(e.target.value)}
          >
            Alamat Admin
            <InputRequired />
          </InputField>
          {/* JENIS KELAMIN ADMIN */}
          <InputSelect
            Options={JENIS_KELAMIN}
            HtmlFor={'jenis-kelamin'}
            PlaceHolder={'Jenis Kelamin'}
            Required={true}
            Value={jenisKelamin}
            AutoComplete="OFF"
            OnChange={(e) => {
              setJenisKelamin(e.target.value);
            }}
          >
            Pilih Jenis Kelamin
            <InputRequired />
          </InputSelect>
          {/* TEMPAT LAHIR ADMIN */}
          <InputField
            HtmlFor="tempat-lahir-admin"
            Type="text"
            Value={tempatLahir}
            Placeholder={currentTempatLahir}
            Required={true}
            OnChange={(e) => setTempatLahir(e.target.value)}
          >
            Tempat Lahir Admin
            <InputRequired />
          </InputField>
          {/* TANGGAL LAHIR ADMIN */}
          <DatePick
            HtmlFor={'tanggal-lahir'}
            Value={tanggalLahir}
            Required={true}
            AutoComplete="OFF"
            Placeholder={formatCurrentTanggalLahir}
            OnChange={setTanggalLahir}
          >
            Tanggal Lahir Admin
            <InputRequired />
          </DatePick>
          {/* EMAIL ADMIN */}
          <InputField
            HtmlFor="email-admin"
            Type="text"
            Value={email}
            Placeholder={currentEmail}
            Required={true}
            OnChange={(e) => setEmail(e.target.value)}
          >
            Email Siswa
            <InputRequired />
          </InputField>
          {/* NOMOR HP ADMIN */}
          <InputField
            HtmlFor="nomor-hp-admin"
            Type="text"
            Value={nomorHP}
            Placeholder={currentNomorHP}
            Required={true}
            OnChange={(e) => setNomorHP(e.target.value)}
          >
            Nomor HP Admin
            <InputRequired />
          </InputField>
        </div>
        <div className="flex gap-2 md:gap-4 justify-end sm:justify-center">
          <Button
            Type="submit"
            ButtonStyle="PRIMARY"
            Disabled={isInputValid ? false : true}
          >
            Simpan
          </Button>
          <Button OnClick={() => cancelEditBiodataAdmin()} ButtonStyle="DANGER">
            Batal
          </Button>
        </div>
      </Form>
    </div>
  );
}

EditDataAdmin.propTypes = {
  BiodataAdmin: PropTypes.object,
};

export default EditDataAdmin;
