import PropTypes from 'prop-types';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import Button from '../../../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputSelect from '../../../../../components/form/InputSelect';
import InputRequired from '../../../../../components/form/InputRequired';
import DatePick from '../../../../../components/ui/DatePick';
import { updateGuru } from '../../../../../api/guru';
import BoxError from '../../../../../components/ui/BoxError';
import { JENIS_KELAMIN } from '../../../../../config/jenisKelamin';
import { SELECT_STATUS } from '../../../../../config/status';

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

function EditData({ BiodataGuru }) {
  const {
    id,
    user_id,
    nama: currentNama,
    nip: currentNip,
    alamat: currentAlamat,
    jenisKelamin: currentJenisKelamin,
    tempatLahir: currentTempatLahir,
    tanggalLahir: currentTanggalLahir,
    email: currentEmail,
    nomorHP: currentNomorHP,
    status: currentStatus,
  } = BiodataGuru;

  const formatCurrentTanggalLahir = new Date(
    currentTanggalLahir
  ).toLocaleDateString('id-ID');

  const [nama, setNama] = useState(currentNama);
  const [nip, setNip] = useState(currentNip);
  const [jenisKelamin, setJenisKelamin] = useState(currentJenisKelamin);
  const [tempatLahir, setTempatLahir] = useState(currentTempatLahir);
  const [tanggalLahir, setTanggalLahir] = useState(
    new Date(currentTanggalLahir)
  );
  const [alamat, setAlamat] = useState(currentAlamat);
  const [email, setEmail] = useState(currentEmail);
  const [nomorHP, setNomorHP] = useState(currentNomorHP);
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function handleUpdateGuru(formData) {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const response = await updateGuru(id, formData);
      const data = response.data.data;
      console.log(data);
      console.log('updated biodata guru');
      navigate(`/guru/${data.id}`, {
        state: { success: true, message: 'Berhasil mengubah biodata guru' },
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

  function submitEditBiodataGuru(e) {
    e.preventDefault();
    if (!checkInput()) return setIsError(true);
    const formData = {
      ...BiodataGuru,
      user_id,
      nama,
      nip,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamat,
      email,
      nomorHP,
      status,
    };
    console.log(formData);
    handleUpdateGuru(formData);
    return;
  }

  function checkInput() {
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
    if (status === '') {
      setErrorMessage('Status guru harus diisi');
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
    status,
  ]);

  useEffect(() => {
    if (
      nama === '' ||
      nip === '' ||
      alamat === '' ||
      jenisKelamin === '' ||
      tempatLahir === '' ||
      tanggalLahir === null ||
      email === '' ||
      nomorHP === '' ||
      status === '' ||
      isError
    )
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [
    nama,
    nip,
    alamat,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    email,
    nomorHP,
    status,
    isError,
  ]);

  function cancelEditBiodataGuru() {
    navigate(`/guru/${id}`);
  }

  return (
    <div className="w-full h-full p-4 space-y-4 md:space-y-6">
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      <Form OnSubmit={(e) => submitEditBiodataGuru(e)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* NAMA GURU */}
          <InputField
            HtmlFor="nama-guru"
            Type="text"
            Value={nama}
            Placeholder={currentNama}
            Required={true}
            OnChange={(e) => setNama(e.target.value)}
          >
            Nama
            <InputRequired />
          </InputField>
          {/* NIP GURU */}
          <InputField
            HtmlFor="nip-guru"
            Type="text"
            Value={nip}
            Placeholder={currentNip}
            Required={true}
            OnChange={(e) => setNip(e.target.value)}
          >
            NIP
            <InputRequired />
          </InputField>
          {/* ALAMAT GURU */}
          <InputField
            HtmlFor="alamat-guru"
            Type="text"
            Value={alamat}
            Placeholder={currentAlamat}
            Required={true}
            OnChange={(e) => setAlamat(e.target.value)}
          >
            Alamat
            <InputRequired />
          </InputField>
          {/* JENIS KELAMIN GURU */}
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
          {/* TEMPAT LAHIR GURU */}
          <InputField
            HtmlFor="tempat-lahir-guru"
            Type="text"
            Value={tempatLahir}
            Placeholder={currentTempatLahir}
            Required={true}
            OnChange={(e) => setTempatLahir(e.target.value)}
          >
            Tempat Lahir
            <InputRequired />
          </InputField>
          {/* TANGGAL LAHIR GURU */}
          <DatePick
            HtmlFor={'tanggal-lahir'}
            Value={tanggalLahir}
            Required={true}
            AutoComplete="OFF"
            Placeholder={formatCurrentTanggalLahir}
            OnChange={setTanggalLahir}
          >
            Tanggal Lahir
            <InputRequired />
          </DatePick>
          {/* EMAIL GURU */}
          <InputField
            HtmlFor="email-guru"
            Type="text"
            Value={email}
            Placeholder={currentEmail}
            Required={true}
            OnChange={(e) => setEmail(e.target.value)}
          >
            Email
            <InputRequired />
          </InputField>
          {/* NOMOR HP GURU */}
          <InputField
            HtmlFor="nomor-hp-guru"
            Type="text"
            Value={nomorHP}
            Placeholder={currentNomorHP}
            Required={true}
            OnChange={(e) => setNomorHP(e.target.value)}
          >
            Nomor HP
            <InputRequired />
          </InputField>
          {/* STATUS GURU */}
          <InputSelect
            Options={SELECT_STATUS}
            HtmlFor={'status-guru'}
            PlaceHolder={'Pilih Status Guru'}
            Required={true}
            Value={status}
            AutoComplete="OFF"
            OnChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            Status
            <InputRequired />
          </InputSelect>
        </div>
        <div className="flex gap-2 md:gap-4 justify-end sm:justify-center">
          <Button
            Type="submit"
            ButtonStyle="PRIMARY"
            Disabled={isInputValid ? false : true}
          >
            Simpan
          </Button>
          <Button OnClick={() => cancelEditBiodataGuru()} ButtonStyle="DANGER">
            Batal
          </Button>
        </div>
      </Form>
    </div>
  );
}

EditData.propTypes = {
  BiodataGuru: PropTypes.object,
};

export default EditData;
