import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGuru } from '../../../../../api/guru';
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

function AddBiodataGuru({ User }) {
  const { id, username } = User;
  const [nama, setNama] = useState('');
  const [nip, setNip] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');
  const [nomorHP, setNomorHP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function createBiodataGuru(formData) {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await createGuru(formData);
      const data = response.data.data;
      console.log(data);
      console.log('add biodata guru');
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

  function submitBiodataGuru(e) {
    e.preventDefault();
    if (!checkInput()) return setIsError(true);
    const formData = {
      user_id: id,
      nama: nama,
      nip: nip,
      jenisKelamin: jenisKelamin,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      alamat: alamat,
      email: email,
      nomorHP: nomorHP,
    };
    console.log(formData);
    createBiodataGuru(formData);
    return;
  }

  function checkInput() {
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
    if (nip === '') {
      setErrorMessage('NIP harus diisi');
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
  }, [
    nama,
    nip,
    alamat,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    email,
    nomorHP,
  ]);

  useEffect(() => {
    if (
      id === '' ||
      username === '' ||
      nama === '' ||
      nip === '' ||
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
    nip,
    alamat,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    email,
    nomorHP,
    isError,
  ]);

  function cancelAddBiodataGuru() {
    navigate('/');
  }

  return (
    <>
      <Header>Tambah Biodata Guru</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={submitBiodataGuru}>
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
              {/* Nama Guru */}
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
              {/* NIP Guru */}
              <InputField
                HtmlFor="nip"
                Type="text"
                Value={nip}
                Placeholder="123456781234561123"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNip(e.target.value);
                }}
              >
                NIP
                <InputRequired />
              </InputField>
              {/* Alamat Guru */}
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
              {/* Jenis Kelamin Guru */}
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
              {/* Tempat Lahir Guru */}
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
              {/* Tanggal Lahir Guru */}
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
              {/* Email Guru */}
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
              {/* Nomor HP Guru */}
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
              {/* <Button Type="submit">Simpan</Button> */}
              <Button
                OnClick={() => cancelAddBiodataGuru()}
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

AddBiodataGuru.propTypes = {
  User: PropTypes.object,
};

export default AddBiodataGuru;
