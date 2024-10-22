import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIdentitasSekolah } from '../../../../../api/dashboard';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import BoxError from '../../../../../components/ui/BoxError';
import InputField from '../../../../../components/form/InputField';
import InputRequired from '../../../../../components/form/InputRequired';
import Button from '../../../../../components/ui/Button';
import Form from '../../../../../components/form/Form';

function AddIdentitasSekolahAdmin({ TextHeader }) {
  const [npsn, setNpsn] = useState('');
  const [statusSekolah, setStatusSekolah] = useState('');
  const [bentukPendidikan, setBentukPendidikan] = useState('');
  const [statusKepemilikan, setStatusKepemilikan] = useState('');
  const [skPendirianSekolah, setSkPendirianSekolah] = useState('');
  const [tanggalSkPendirianSekolah, setTanggalSkPendirianSekolah] =
    useState('');
  const [skIzinOperasional, setSkIzinOperasional] = useState('');
  const [tanggalSkIzinOperasional, setTanggalSkIzinOperasional] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function createNewIdentitasSekolah(formData) {
    setIsError(false);
    setIsloading(true);
    try {
      await createIdentitasSekolah(formData);
      // const response = await createIdentitasSekolah(formData);
      // const data = response?.data?.data;
      // console.log(data);
      navigate('/', {
        state: {
          success: true,
          message: 'Berhasil menambahkan identitas sekolah',
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

  function submitNewIdentitasSekolah(e) {
    e.preventDefault();
    if (!checkInput()) return;
    const formData = {
      id: npsn,
      npsn: npsn,
      status: statusSekolah,
      bentuk_pendidikan: bentukPendidikan.toUpperCase(),
      status_kepemilikan: statusKepemilikan,
      sk_pendirian_sekolah: skPendirianSekolah.toUpperCase(),
      tanggal_sk_pendirian: tanggalSkPendirianSekolah,
      sk_izin_operasional: skIzinOperasional.toUpperCase(),
      tanggal_sk_izin_operasional: tanggalSkIzinOperasional,
    };
    // console.log(formData);
    createNewIdentitasSekolah(formData);
    return;
  }

  function checkInput() {
    setIsError(true);
    if (npsn === '') {
      setErrorMessage('NPSN harus diisi');
      return false;
    }
    if (statusSekolah === '') {
      setErrorMessage('Status sekolah harus diisi');
      return false;
    }
    if (bentukPendidikan === '') {
      setErrorMessage('Bentuk pendidikan sekolah harus diisi');
      return false;
    }
    if (statusKepemilikan === '') {
      setErrorMessage('Status Kepemilikan sekolah harus diisi');
      return false;
    }
    if (skPendirianSekolah === '') {
      setErrorMessage('SK pendirian sekolah harus diisi');
      return false;
    }
    if (tanggalSkPendirianSekolah === '') {
      setErrorMessage('Tanggal SK pendirian sekolah harus diisi');
      return false;
    }
    if (skIzinOperasional === '') {
      setErrorMessage('SK izin operasional sekolah harus diisi');
      return false;
    }
    if (tanggalSkIzinOperasional === '') {
      setErrorMessage('tanggal SK izin operasional sekolah harus diisi');
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
    npsn,
    statusSekolah,
    bentukPendidikan,
    statusKepemilikan,
    skPendirianSekolah,
    tanggalSkPendirianSekolah,
    skIzinOperasional,
    tanggalSkIzinOperasional,
  ]);

  useEffect(() => {
    if (
      npsn === '' ||
      statusSekolah === '' ||
      bentukPendidikan === '' ||
      statusKepemilikan === '' ||
      skPendirianSekolah === '' ||
      tanggalSkPendirianSekolah === '' ||
      skIzinOperasional === '' ||
      tanggalSkIzinOperasional === '' ||
      isLoading ||
      isError
    )
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [
    npsn,
    statusSekolah,
    bentukPendidikan,
    statusKepemilikan,
    skPendirianSekolah,
    tanggalSkPendirianSekolah,
    skIzinOperasional,
    tanggalSkIzinOperasional,
    isLoading,
    isError,
  ]);

  function cancelAddIdentitasSekolah() {
    navigate('/');
  }

  return (
    <>
      <Header>{TextHeader}</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={submitNewIdentitasSekolah}>
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
              {/* STATUS SEKOLAH */}
              <InputField
                HtmlFor="status-sekolah"
                Type="text"
                Value={statusSekolah}
                Placeholder="status sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setStatusSekolah(e.target.value);
                }}
              >
                Status Sekolah
                <InputRequired />
              </InputField>
              {/* BENTUK PENDIDIKAN SEKOLAH */}
              <InputField
                HtmlFor="bentuk-pendidikan-sekolah"
                Type="text"
                Value={bentukPendidikan}
                Placeholder="bentuk pendidikan sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setBentukPendidikan(e.target.value);
                }}
              >
                Bentuk Pendidikan Sekolah
                <InputRequired />
              </InputField>
              {/* STATUS KEPEMILIKAN SEKOLAH */}
              <InputField
                HtmlFor="status-kepemilikan-sekolah"
                Type="text"
                Value={statusKepemilikan}
                Placeholder="status kepemilikan sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setStatusKepemilikan(e.target.value);
                }}
              >
                Status Kepemilikan Sekolah
                <InputRequired />
              </InputField>
              {/* SK PENDIRIAN SEKOLAH */}
              <InputField
                HtmlFor="sk-pendirian-sekolah"
                Type="text"
                Value={skPendirianSekolah}
                Placeholder="sk pendirian sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setSkPendirianSekolah(e.target.value);
                }}
              >
                SK Pendirian Sekolah
                <InputRequired />
              </InputField>
              {/* TANGGAL SK PENDIRIAN SEKOLAH */}
              <InputField
                HtmlFor="tanggal-sk-pendirian-sekolah"
                Type="text"
                Value={tanggalSkPendirianSekolah}
                Placeholder="tanggal sk pendirian sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setTanggalSkPendirianSekolah(e.target.value);
                }}
              >
                Tanggal SK Pendirian Sekolah
                <InputRequired />
              </InputField>
              {/* SK IZIN OPERASIONAL SEKOLAH */}
              <InputField
                HtmlFor="sk-izin-operasional-sekolah"
                Type="text"
                Value={skIzinOperasional}
                Placeholder="sk izin operasional sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setSkIzinOperasional(e.target.value);
                }}
              >
                SK Izin Operasional
                <InputRequired />
              </InputField>
              {/* TANGGAL SK OPERASIONAL SEKOLAH */}
              <InputField
                HtmlFor="tanggal-sk-operasional-sekolah"
                Type="text"
                Value={tanggalSkIzinOperasional}
                Placeholder="tanggal sk operasional sekolah"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setTanggalSkIzinOperasional(e.target.value);
                }}
              >
                Tanggal SK Izin Operasional Sekolah
                <InputRequired />
              </InputField>
            </div>
            <div className="flex gap-2 sm:gap-4 justify-end sm:justify-center">
              <Button Type="submit" Disabled={isInputValid ? false : true}>
                Simpan
              </Button>
              <Button
                OnClick={() => cancelAddIdentitasSekolah()}
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

AddIdentitasSekolahAdmin.propTypes = {
  TextHeader: PropTypes.string,
};

export default AddIdentitasSekolahAdmin;
