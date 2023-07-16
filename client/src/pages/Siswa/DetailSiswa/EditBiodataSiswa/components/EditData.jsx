import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BoxError from '../../../../../components/ui/BoxError';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import InputRequired from '../../../../../components/form/InputRequired';
import InputSelect from '../../../../../components/form/InputSelect';
import DatePick from '../../../../../components/ui/DatePick';
import Button from '../../../../../components/ui/Button';
import { updateSiswa } from '../../../../../api/siswa';
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

function EditData({ BiodataSiswa }) {
  const {
    id,
    user_id,
    nama: currentNama,
    nisn: currentNisn,
    nis: currentNis,
    alamat: currentAlamat,
    jenisKelamin: currentJenisKelamin,
    tempatLahir: currentTempatLahir,
    tanggalLahir: currentTanggalLahir,
    namaAyah: currentNamaAyah,
    namaIbu: currentNamaIbu,
    email: currentEmail,
    nomorHP: currentNomorHP,
    tahunAngkatan: currentTahunAngkatan,
    status: currentStatus,
  } = BiodataSiswa;

  const formatCurrentTanggalLahir = new Date(
    currentTanggalLahir
  ).toLocaleDateString('id-ID');

  const [nama, setNama] = useState(currentNama);
  const [nisn, setNisn] = useState(currentNisn);
  const [nis, setNis] = useState(currentNis);
  const [jenisKelamin, setJenisKelamin] = useState(currentJenisKelamin);
  const [tempatLahir, setTempatLahir] = useState(currentTempatLahir);
  const [tanggalLahir, setTanggalLahir] = useState(
    new Date(currentTanggalLahir)
  );
  const [alamat, setAlamat] = useState(currentAlamat);
  const [namaAyah, setNamaAyah] = useState(currentNamaAyah);
  const [namaIbu, setNamaIbu] = useState(currentNamaIbu);
  const [email, setEmail] = useState(currentEmail);
  const [nomorHP, setNomorHP] = useState(currentNomorHP);
  const [tahunAngkatan, setTahunAngkata] = useState(currentTahunAngkatan);
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function handleUpdateSiswa(formData) {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const response = await updateSiswa(id, formData);
      const data = response.data.data;
      // console.log(data);
      // console.log('updated biodata siswa');
      navigate(`/siswa/${data.id}`, {
        state: { success: true, message: 'Berhasil mengubah biodata siswa' },
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

  function submitEditBiodataSiswa(e) {
    e.preventDefault();
    if (!checkInput()) return setIsError(true);
    const formData = {
      ...BiodataSiswa,
      user_id,
      nama,
      nisn,
      nis,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamat,
      namaAyah,
      namaIbu,
      email,
      nomorHP,
      tahunAngkatan,
      status,
    };
    // console.log(formData);
    handleUpdateSiswa(formData);
    return;
  }

  function checkInput() {
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
    if (tahunAngkatan === '') {
      setErrorMessage('Tahun angkatan harus diisi');
      return false;
    }
    if (status === '') {
      setErrorMessage('Status siswa harus diisi');
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
    tahunAngkatan,
    status,
  ]);

  useEffect(() => {
    if (
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
      tahunAngkatan === '' ||
      status === '' ||
      isError
    )
      return setIsInputValid(false);
    return setIsInputValid(true);
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
    tahunAngkatan,
    status,
    isError,
  ]);

  function cancelEditBiodataSiswa() {
    navigate(`/siswa/${id}`);
  }

  return (
    <div className="w-full h-full p-4 space-y-4 md:space-y-6">
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      <Form OnSubmit={(e) => submitEditBiodataSiswa(e)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* NAMA SISWA */}
          <InputField
            HtmlFor="nama-siswa"
            Type="text"
            Value={nama}
            Placeholder={currentNama}
            Required={true}
            OnChange={(e) => setNama(e.target.value)}
          >
            Nama
            <InputRequired />
          </InputField>
          {/* NISN SISWA */}
          <InputField
            HtmlFor="nisn-siswa"
            Type="text"
            Value={nisn}
            Placeholder={currentNisn}
            Required={true}
            OnChange={(e) => setNisn(e.target.value)}
          >
            NISN
            <InputRequired />
          </InputField>
          {/* NIS SISWA */}
          <InputField
            HtmlFor="nis-siswa"
            Type="text"
            Value={nis}
            Placeholder={currentNis}
            Required={true}
            OnChange={(e) => setNis(e.target.value)}
          >
            NIS
            <InputRequired />
          </InputField>
          {/* ALAMAT SISWA */}
          <InputField
            HtmlFor="alamat-siswa"
            Type="text"
            Value={alamat}
            Placeholder={currentAlamat}
            Required={true}
            OnChange={(e) => setAlamat(e.target.value)}
          >
            Alamat
            <InputRequired />
          </InputField>
          {/* JENIS KELAMIN SISWA */}
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
          {/* TEMPAT LAHIR SISWA */}
          <InputField
            HtmlFor="tempat-lahir-siswa"
            Type="text"
            Value={tempatLahir}
            Placeholder={currentTempatLahir}
            Required={true}
            OnChange={(e) => setTempatLahir(e.target.value)}
          >
            Tempat Lahir
            <InputRequired />
          </InputField>
          {/* TANGGAL LAHIR SISWA */}
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
          {/* NAMA AYAH SISWA */}
          <InputField
            HtmlFor="nama-ayah-siswa"
            Type="text"
            Value={namaAyah}
            Placeholder={currentNamaAyah}
            Required={true}
            OnChange={(e) => setNamaAyah(e.target.value)}
          >
            Nama Ayah
            <InputRequired />
          </InputField>
          {/* NAMA IBU SISWA */}
          <InputField
            HtmlFor="nama-ibu-siswa"
            Type="text"
            Value={namaIbu}
            Placeholder={currentNamaIbu}
            Required={true}
            OnChange={(e) => setNamaIbu(e.target.value)}
          >
            Nama Ibu
            <InputRequired />
          </InputField>
          {/* EMAIL SISWA */}
          <InputField
            HtmlFor="email-siswa"
            Type="text"
            Value={email}
            Placeholder={currentEmail}
            Required={true}
            OnChange={(e) => setEmail(e.target.value)}
          >
            Email
            <InputRequired />
          </InputField>
          {/* NOMOR HP SISWA */}
          <InputField
            HtmlFor="nomor-hp-siswa"
            Type="text"
            Value={nomorHP}
            Placeholder={currentNomorHP}
            Required={true}
            OnChange={(e) => setNomorHP(e.target.value)}
          >
            Nomor HP
            <InputRequired />
          </InputField>
          {/* TAHUN ANGKATAN SISWA */}
          <InputField
            HtmlFor="tahun-angkatan-siswa"
            Type="text"
            Value={tahunAngkatan}
            Placeholder={currentTahunAngkatan}
            Required={true}
            OnChange={(e) => setTahunAngkata(e.target.value)}
          >
            Tahun Angkatan
            <InputRequired />
          </InputField>
          {/* STATUS SISWA */}
          <InputSelect
            Options={SELECT_STATUS}
            HtmlFor={'status'}
            PlaceHolder={'Pilih Status Siswa'}
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
          <Button OnClick={() => cancelEditBiodataSiswa()} ButtonStyle="DANGER">
            Batal
          </Button>
        </div>
      </Form>
    </div>
  );
}

EditData.propTypes = {
  BiodataSiswa: PropTypes.object,
};

export default EditData;
