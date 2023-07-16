import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfilSekolah } from '../../../../../api/dashboard';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import BoxError from '../../../../../components/ui/BoxError';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import InputRequired from '../../../../../components/form/InputRequired';
import Button from '../../../../../components/ui/Button';

function EditProfileSekolahAdmin({ TextHeader, DataProfilSekolah }) {
  const {
    id,
    npsn: currentNpsn,
    nama_sekolah: currentNamaSekolah,
    nama_kepala_sekolah: currentNamaKepalaSekolah,
    nama_operator: currentNamaOperator,
    akreditasi: currentAkreditasi,
  } = DataProfilSekolah;

  const [npsn, setNpsn] = useState(currentNpsn);
  const [namaSekolah, setNamaSekolah] = useState(currentNamaSekolah);
  const [namaKepalaSekolah, setNamaKepalaSekolah] = useState(
    currentNamaKepalaSekolah
  );
  const [namaOperator, setNamaOperator] = useState(currentNamaOperator);
  const [akreditasi, setAkreditasi] = useState(currentAkreditasi);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function handleUpdateProfilSekolah(formData) {
    setIsError(false);
    setIsloading(true);
    try {
      await updateProfilSekolah(id, formData);
      // const response = await updateProfilSekolah(id, formData);
      // const data = response?.data?.data;
      // console.log(data);
      navigate('/', {
        state: {
          success: true,
          message: 'Berhasil mengubah profil sekolah',
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

  function submitUpdateProfilSekolah(e) {
    e.preventDefault();
    if (!checkInput()) return;
    const formData = {
      ...DataProfilSekolah,
      id: npsn,
      npsn: npsn,
      nama_sekolah: namaSekolah.toUpperCase(),
      nama_kepala_sekolah: namaKepalaSekolah,
      nama_operator: namaOperator,
      akreditasi: akreditasi.toUpperCase(),
    };
    // console.log(formData);
    handleUpdateProfilSekolah(formData);
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

  function cancelEditProfilSekolah() {
    navigate('/');
  }

  return (
    <>
      <Header>{TextHeader}</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={submitUpdateProfilSekolah}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {/* NPSN SEKOLAH */}
              <InputField
                HtmlFor="npsn"
                Type="text"
                Value={npsn}
                Placeholder={currentNpsn}
                Required={true}
                AutoComplete="OFF"
                Disabled={true}
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
                Placeholder={currentNamaSekolah}
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
                Placeholder={currentNamaKepalaSekolah}
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
                Placeholder={currentNamaOperator}
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
                Placeholder={currentAkreditasi}
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
                OnClick={() => cancelEditProfilSekolah()}
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

EditProfileSekolahAdmin.propTypes = {
  TextHeader: PropTypes.string,
  DataProfilSekolah: PropTypes.object,
};

export default EditProfileSekolahAdmin;
