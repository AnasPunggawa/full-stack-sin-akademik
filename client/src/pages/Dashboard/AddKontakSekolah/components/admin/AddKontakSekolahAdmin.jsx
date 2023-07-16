import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createKontakSekolah } from '../../../../../api/dashboard';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import BoxError from '../../../../../components/ui/BoxError';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import InputRequired from '../../../../../components/form/InputRequired';
import Button from '../../../../../components/ui/Button';

function AddKontakSekolahAdmin({ TextHeader }) {
  const [npsn, setNpsn] = useState('');
  const [alamat, setAlamat] = useState('');
  const [rtSekolah, setRtSekolah] = useState('');
  const [rwSekolah, setRwSekolah] = useState('');
  const [dusun, setDusun] = useState('');
  const [desaKelurahan, setDesaKelurahan] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kodePos, setKodePos] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function createNewKontakSekolah(formData) {
    setIsError(false);
    setIsloading(true);
    try {
      await createKontakSekolah(formData);
      // const response = await createKontakSekolah(formData);
      // const data = response?.data?.data;
      // console.log(data);
      navigate('/', {
        state: {
          success: true,
          message: 'Berhasil menambahkan kontak sekolah',
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

  function submitNewKontakSekolah(e) {
    e.preventDefault();
    if (!checkInput()) return;
    const formData = {
      id: npsn,
      npsn: npsn,
      alamat: alamat,
      rt: rtSekolah,
      rw: rwSekolah,
      dusun: dusun,
      desa_kelurahan: desaKelurahan,
      kecamatan: kecamatan,
      kabupaten: kabupaten,
      provinsi: provinsi,
      kode_pos: kodePos,
      nomor_telepon: nomorTelepon,
      email: email,
    };
    // console.log(formData);
    createNewKontakSekolah(formData);
    return;
  }

  function checkInput() {
    setIsError(true);
    if (npsn === '') {
      setErrorMessage('NPSN harus diisi');
      return false;
    }
    if (alamat === '') {
      setErrorMessage('Alamat sekolah harus diisi');
      return false;
    }
    if (rtSekolah === '') {
      setErrorMessage('RT kepala sekolah harus diisi');
      return false;
    }
    if (rwSekolah === '') {
      setErrorMessage('RW operator sekolah harus diisi');
      return false;
    }
    if (dusun === '') {
      setErrorMessage('Dusun sekolah harus diisi');
      return false;
    }
    if (desaKelurahan === '') {
      setErrorMessage('Desan atau kelurahan sekolah harus diisi');
      return false;
    }
    if (kecamatan === '') {
      setErrorMessage('Kecamatan sekolah harus diisi');
      return false;
    }
    if (kabupaten === '') {
      setErrorMessage('Kabupaten sekolah harus diisi');
      return false;
    }
    if (provinsi === '') {
      setErrorMessage('Provinsi sekolah harus diisi');
      return false;
    }
    if (kodePos === '') {
      setErrorMessage('Kode pos sekolah harus diisi');
      return false;
    }
    if (nomorTelepon === '') {
      setErrorMessage('Nomor telepon sekolah harus diisi');
      return false;
    }
    if (email === '') {
      setErrorMessage('Email sekolah harus diisi');
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
    alamat,
    rtSekolah,
    rwSekolah,
    dusun,
    desaKelurahan,
    kecamatan,
    kabupaten,
    provinsi,
    kodePos,
    nomorTelepon,
    email,
  ]);

  useEffect(() => {
    if (
      npsn === '' ||
      alamat === '' ||
      rtSekolah === '' ||
      rwSekolah === '' ||
      dusun === '' ||
      desaKelurahan === '' ||
      kecamatan === '' ||
      kabupaten === '' ||
      provinsi === '' ||
      kodePos === '' ||
      nomorTelepon === '' ||
      email === '' ||
      isLoading ||
      isError
    )
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [
    npsn,
    alamat,
    rtSekolah,
    rwSekolah,
    dusun,
    desaKelurahan,
    kecamatan,
    kabupaten,
    provinsi,
    kodePos,
    nomorTelepon,
    email,
    isLoading,
    isError,
  ]);

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
          <Form OnSubmit={submitNewKontakSekolah}>
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
              {/* ALAMAT SEKOLAH */}
              <InputField
                HtmlFor="alamat"
                Type="text"
                Value={alamat}
                Placeholder="alamat"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setAlamat(e.target.value);
                }}
              >
                Alamat
                <InputRequired />
              </InputField>
              {/* RT SEKOLAH */}
              <InputField
                HtmlFor="rt-sekolah"
                Type="text"
                Value={rtSekolah}
                Placeholder="rt"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setRtSekolah(e.target.value);
                }}
              >
                RT
                <InputRequired />
              </InputField>
              {/* RW SEKOLAH */}
              <InputField
                HtmlFor="rw-sekolah"
                Type="text"
                Value={rwSekolah}
                Placeholder="rw"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setRwSekolah(e.target.value);
                }}
              >
                RW
                <InputRequired />
              </InputField>
              {/* DUSUN SEKOLAH */}
              <InputField
                HtmlFor="dusun-sekolah"
                Type="text"
                Value={dusun}
                Placeholder="dusun"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setDusun(e.target.value);
                }}
              >
                Dusun
                <InputRequired />
              </InputField>
              {/* DESA ATAU KELURAHAN SEKOLAH */}
              <InputField
                HtmlFor="desa-kelurahan-sekolah"
                Type="text"
                Value={desaKelurahan}
                Placeholder="desa atau kelurahan"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setDesaKelurahan(e.target.value);
                }}
              >
                Desa atau Kelurahan
                <InputRequired />
              </InputField>
              {/* KECAMATAN SEKOLAH */}
              <InputField
                HtmlFor="kecamatan-sekolah"
                Type="text"
                Value={kecamatan}
                Placeholder="kecamatan"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setKecamatan(e.target.value);
                }}
              >
                Kecamatan
                <InputRequired />
              </InputField>
              {/* KABUPATEN SEKOLAH */}
              <InputField
                HtmlFor="kabupaten-sekolah"
                Type="text"
                Value={kabupaten}
                Placeholder="kabupaten"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setKabupaten(e.target.value);
                }}
              >
                Kabupaten
                <InputRequired />
              </InputField>
              {/* PROVINSI SEKOLAH */}
              <InputField
                HtmlFor="provinsi-sekolah"
                Type="text"
                Value={provinsi}
                Placeholder="provinsi"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setProvinsi(e.target.value);
                }}
              >
                Provinsi
                <InputRequired />
              </InputField>
              {/* KODE POS SEKOLAH */}
              <InputField
                HtmlFor="kode-pos-sekolah"
                Type="text"
                Value={kodePos}
                Placeholder="kode pos"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setKodePos(e.target.value);
                }}
              >
                Kode Pos
                <InputRequired />
              </InputField>
              {/* NOMOR TELEPON SEKOLAH */}
              <InputField
                HtmlFor="nomor-telepon-sekolah"
                Type="text"
                Value={nomorTelepon}
                Placeholder="nomor telepon"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNomorTelepon(e.target.value);
                }}
              >
                Nomor Telepon
                <InputRequired />
              </InputField>
              {/* NOMOR TELEPON SEKOLAH */}
              <InputField
                HtmlFor="email-sekolah"
                Type="text"
                Value={email}
                Placeholder="contohEmail@mail.com"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setEmail(e.target.value);
                }}
              >
                Email
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

AddKontakSekolahAdmin.propTypes = {
  TextHeader: PropTypes.string,
};

export default AddKontakSekolahAdmin;
