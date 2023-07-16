import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProfilSekolah } from '../../../../../api/dashboard';
import InputField from '../../../../../components/form/InputField';
import InputRequired from '../../../../../components/form/InputRequired';
import Form from '../../../../../components/form/Form';
import BoxError from '../../../../../components/ui/BoxError';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import Button from '../../../../../components/ui/Button';

function AddProfileSekolahAdmin({ TextHeader }) {
  const [npsn, setNpsn] = useState('');
  const [namaSekolah, setNamaSekolah] = useState('');
  const [namaKepalaSekolah, setNamaKepalaSekolah] = useState('');
  const [namaOperator, setNamaOperator] = useState('');
  const [akreditasi, setAkreditasi] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function createNewProfilSekolah(formData) {
    setIsError(false);
    setIsloading(true);
    try {
      await createProfilSekolah(formData);
      // const response = await createProfilSekolah(formData);
      // const data = response?.data?.data;
      // console.log(data);
      navigate('/', {
        state: {
          success: true,
          message: 'Berhasil menambahkan profil sekolah',
        },
        replace: true,
      });
    } catch (error) {
      setIsError(true);
      if (error.response.status === 500)
        return setErrorMessage('Something went wrong');
      if (error.response) return setErrorMessage(error.response.data.message);
      return setErrorMessage('Something went wrong');
    } finally {
      setIsloading(false);
    }
  }

  function submitNewProfilSekolah(e) {
    e.preventDefault();
    if (!checkInput()) return;
    const formData = {
      id: npsn,
      npsn: npsn,
      nama_sekolah: namaSekolah.toUpperCase(),
      nama_kepala_sekolah: namaKepalaSekolah,
      nama_operator: namaOperator,
      akreditasi: akreditasi.toUpperCase(),
    };
    // console.log(formData);
    createNewProfilSekolah(formData);
    return;
  }

  function checkInput() {
    setIsError(true);
    if (npsn === '') {
      setErrorMessage('NPSN harus diisi');
      return false;
    }
    if (namaSekolah === '') {
      setErrorMessage('Nama sekolah harus diisi');
      return false;
    }
    if (namaKepalaSekolah === '') {
      setErrorMessage('Nama kepala sekolah harus diisi');
      return false;
    }
    if (namaOperator === '') {
      setErrorMessage('Nama operator sekolah harus diisi');
      return false;
    }
    if (akreditasi === '') {
      setErrorMessage('Akreditasi sekolah harus diisi');
      return false;
    }
    setIsError(false);
    return true;
  }

  useEffect(() => {
    setIsError(false);
    setErrorMessage('');
    return;
  }, [npsn, namaSekolah, namaKepalaSekolah, namaOperator, akreditasi]);

  useEffect(() => {
    if (
      npsn === '' ||
      namaSekolah === '' ||
      namaKepalaSekolah === '' ||
      namaOperator === '' ||
      akreditasi === '' ||
      isError
    )
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [npsn, namaSekolah, namaKepalaSekolah, namaOperator, akreditasi, isError]);

  function cancelAddProfilSekolah() {
    navigate('/');
  }

  return (
    <>
      <Header>{TextHeader}</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={submitNewProfilSekolah}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {/* NPSN SEKOLAH */}
              <InputField
                HtmlFor="npsn"
                Type="text"
                Value={npsn}
                Placeholder="npsn"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNpsn(e.target.value);
                }}
              >
                NPSN
                <InputRequired />
              </InputField>
              {/* NAMA SEKOLAH */}
              <InputField
                HtmlFor="nama-sekolah"
                Type="text"
                Value={namaSekolah}
                Placeholder="nama sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNamaSekolah(e.target.value);
                }}
              >
                Nama Sekolah
                <InputRequired />
              </InputField>
              {/* NAMA KEPALA SEKOLAH */}
              <InputField
                HtmlFor="nama-kepala-sekolah"
                Type="text"
                Value={namaKepalaSekolah}
                Placeholder="nama kepala sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNamaKepalaSekolah(e.target.value);
                }}
              >
                Nama Kepala Sekolah
                <InputRequired />
              </InputField>
              {/* NAMA OPERATOR SEKOLAH */}
              <InputField
                HtmlFor="nama-operator-sekolah"
                Type="text"
                Value={namaOperator}
                Placeholder="nama operator sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNamaOperator(e.target.value);
                }}
              >
                Nama Operator Sekolah
                <InputRequired />
              </InputField>
              {/* AKREDITASI SEKOLAH */}
              <InputField
                HtmlFor="akreditasi-sekolah"
                Type="text"
                Value={akreditasi}
                Placeholder="akreditasi sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setAkreditasi(e.target.value);
                }}
              >
                Akreditasi Sekolah
                <InputRequired />
              </InputField>
            </div>
            <div className="flex gap-2 sm:gap-4 justify-end sm:justify-center">
              <Button Type="submit" Disabled={isInputValid ? false : true}>
                Simpan
              </Button>
              <Button
                OnClick={() => cancelAddProfilSekolah()}
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

AddProfileSekolahAdmin.propTypes = {
  TextHeader: PropTypes.string,
};

export default AddProfileSekolahAdmin;
