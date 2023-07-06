import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSiswa } from '../../../../../api/siswa';
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

function AddBiodataSiswa({ User }) {
  const { id, username } = User;
  const [nama, setNama] = useState('');
  const [nisn, setNisn] = useState('');
  const [nis, setNis] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [namaAyah, setNamaAyah] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [email, setEmail] = useState('');
  const [nomorHP, setNomorHP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function createBiodataSiswa(formData) {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await createSiswa(formData);
      const data = response.data.data;
      console.log(data);
      console.log('add biodata siswa');
      navigate('/profile');
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

  function submitBiodataSiswa(e) {
    e.preventDefault();
    if (!checkInput()) return;
    const formData = {
      user_id: id,
      nama: nama,
      nisn: nisn,
      nis: nis,
      jenisKelamin: jenisKelamin,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      namaAyah: namaAyah,
      namaIbu: namaIbu,
      alamat: alamat,
      email: email,
      nomorHP: nomorHP,
    };
    console.log(formData);
    createBiodataSiswa(formData);
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
    if (nisn === '') {
      setErrorMessage('NISN harus diisi');
      return false;
    }
    if (nis === '') {
      setErrorMessage('NIS harus diisi');
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
    if (namaAyah === '') {
      setErrorMessage('Nama ayah harus diisi');
      return false;
    }
    if (namaIbu === '') {
      setErrorMessage('Nama ibu harus diisi');
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
  }, [
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
  ]);

  useEffect(() => {
    if (
      id === '' ||
      username === '' ||
      nama === '' ||
      nisn === '' ||
      nis === '' ||
      alamat === '' ||
      jenisKelamin === '' ||
      tempatLahir === '' ||
      tanggalLahir === null ||
      namaAyah === '' ||
      namaIbu === '' ||
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
    isError,
  ]);

  function cancelAddBiodataSiswa() {
    navigate('/');
  }

  return (
    <>
      <Header>Tambah Biodata Siswa</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={submitBiodataSiswa}>
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
              Nama
              <InputRequired />
            </InputField>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {/* Nama Siswa */}
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
              {/* NISN Siswa */}
              <InputField
                HtmlFor="nisn"
                Type="text"
                Value={nisn}
                Placeholder="1234567890"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNisn(e.target.value);
                }}
              >
                NISN
                <InputRequired />
              </InputField>
              {/* NIS Siswa */}
              <InputField
                HtmlFor="nis"
                Type="text"
                Value={nis}
                Placeholder="1234123"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNis(e.target.value);
                }}
              >
                NIS
                <InputRequired />
              </InputField>
              {/* Alamat Siswa */}
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
              {/* Jenis Kelamin Siswa */}
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
              {/* Tempat Lahir Siswa */}
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
              {/* Tanggal Lahir Siswa */}
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
              {/* Nama Ayah Siswa */}
              <InputField
                HtmlFor="nama-ayah"
                Type="text"
                Value={namaAyah}
                Placeholder="ayah siswa"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNamaAyah(e.target.value);
                }}
              >
                Nama Ayah
                <InputRequired />
              </InputField>
              {/* Nama Ibu Siswa */}
              <InputField
                HtmlFor="nama-ibu"
                Type="text"
                Value={namaIbu}
                Placeholder="ibu siswa"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNamaIbu(e.target.value);
                }}
              >
                Nama Ibu
                <InputRequired />
              </InputField>
              {/* Email Siswa */}
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
              {/* Nomor HP Siswa */}
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
                OnClick={() => cancelAddBiodataSiswa()}
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

AddBiodataSiswa.propTypes = {
  User: PropTypes.object,
};

export default AddBiodataSiswa;
