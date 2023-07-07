import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import BoxError from '../../../../../components/ui/BoxError';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import InputRequired from '../../../../../components/form/InputRequired';
import InputSelect from '../../../../../components/form/InputSelect';
import { JENIS_KELAMIN } from '../../../../../config/jenisKelamin';
import DatePick from '../../../../../components/ui/DatePick';
import Button from '../../../../../components/ui/Button';
import { createAdmin } from '../../../../../api/admin';

function AddBiodataAdmin({ User }) {
  const { id, username } = User;
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [email, setEmail] = useState('');
  const [nomorHP, setNomorHP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function createBiodataAdmin(formData) {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await createAdmin(formData);
      const data = response.data.data;
      console.log(data);
      console.log('add biodata admin');
      navigate('/profile', {
        state: { message: 'Biodata berhasil ditambahkan' },
      });
      // navigate('/profile');
    } catch (error) {
      setIsError(true);
      if (error.response.status === 500)
        return setErrorMessage('Something went wrong');
      if (error.response) return setErrorMessage(error.response.data.message);
      return setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  function submitBiodataAdmin(e) {
    e.preventDefault();
    if (!checkInput()) return;
    const formData = {
      user_id: id,
      nama: nama,
      jenisKelamin: jenisKelamin,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      alamat: alamat,
      email: email,
      nomorHP: nomorHP,
    };
    console.log(formData);
    createBiodataAdmin(formData);
    return;
  }

  function checkInput() {
    setIsError(true);
    if (id === '') {
      setErrorMessage('user_id tidak ditemukan');
      return false;
    }
    if (username === '') {
      setErrorMessage('username tidak ditemukan');
      return false;
    }
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
    setIsError(false);
    return true;
  }

  useEffect(() => {
    setIsError(false);
    setErrorMessage('');
    return;
  }, [nama, alamat, jenisKelamin, tempatLahir, tanggalLahir, email, nomorHP]);

  useEffect(() => {
    if (
      id === '' ||
      username === '' ||
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
    id,
    username,
    nama,
    alamat,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    email,
    nomorHP,
    isError,
  ]);

  function cancelAddBiodataAdmin() {
    navigate('/');
  }

  return (
    <>
      <Header>Tambah Biodata Admin</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={submitBiodataAdmin}>
            {/* Username */}
            <InputField
              HtmlFor="username"
              Type="text"
              Value={username}
              Placeholder={username}
              Required={true}
              Disabled={true}
              AutoComplete="OFF"
              OnChange={() => {}}
            >
              Username
              <InputRequired />
            </InputField>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {/* Nama Admin */}
              <InputField
                HtmlFor="nama"
                Type="text"
                Value={nama}
                Placeholder="nama"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNama(e.target.value);
                }}
              >
                Nama
                <InputRequired />
              </InputField>
              {/* Alamat Admin */}
              <InputField
                HtmlFor="alamat"
                Type="text"
                Value={alamat}
                Placeholder="jl. Alamat"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setAlamat(e.target.value);
                }}
              >
                Alamat
                <InputRequired />
              </InputField>
              {/* Jenis Kelamin Admin */}
              <InputSelect
                Options={JENIS_KELAMIN}
                HtmlFor={'jenis-kelamin'}
                PlaceHolder={'Pilih Jenis Kelamin'}
                Required={true}
                Value={jenisKelamin}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setJenisKelamin(e.target.value);
                }}
              >
                Jenis Kelamin
                <InputRequired />
              </InputSelect>
              {/* Tempat Lahir Admin */}
              <InputField
                HtmlFor="tempat-lahir"
                Type="text"
                Value={tempatLahir}
                Placeholder="tempat lahir"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setTempatLahir(e.target.value);
                }}
              >
                Tempat Lahir
                <InputRequired />
              </InputField>
              {/* Tanggal Lahir Admin */}
              <DatePick
                HtmlFor={'tanggal-lahir'}
                Value={tanggalLahir}
                Required={true}
                AutoComplete="OFF"
                Placeholder={'tanggal/bulan/tahun'}
                OnChange={setTanggalLahir}
              >
                Tanggal Lahir
                <InputRequired />
              </DatePick>
              {/* Email Admin */}
              <InputField
                HtmlFor="email"
                Type="text"
                Value={email}
                Placeholder="example@mail.co"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setEmail(e.target.value);
                }}
              >
                Email
                <InputRequired />
              </InputField>
              {/* Nomor HP Admin */}
              <InputField
                HtmlFor="nomor-hp"
                Type="text"
                Value={nomorHP}
                Placeholder="081234567890"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNomorHP(e.target.value);
                }}
              >
                Nomor HP
                <InputRequired />
              </InputField>
            </div>
            <div className="flex gap-2 sm:gap-4 justify-end sm:justify-center">
              <Button Type="submit" Disabled={isInputValid ? false : true}>
                Simpan
              </Button>
              <Button
                OnClick={() => cancelAddBiodataAdmin()}
                ButtonStyle="DANGER"
              >
                Batal
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}

AddBiodataAdmin.propTypes = {
  User: PropTypes.object,
};

export default AddBiodataAdmin;
