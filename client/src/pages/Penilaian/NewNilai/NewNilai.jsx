import { useEffect, useState } from 'react';
import Form from '../../../components/form/Form';
import { useTitle } from '../../../hooks/useTitle';
import Container from '../components/Container';
import Header from '../components/Header';
import SelectSemester from './components/SelectSemester';
import SelectKelas from './components/SelectKelas';
import SelectMataPelajaran from './components/SelectMataPelajaran';
import SearchNamaSiswa from './components/SearchNamaSiswa';
import InputField from '../../../components/form/InputField';
import InputRequired from '../../../components/form/InputRequired';
import InputTextarea from '../../../components/form/InputTextarea';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import BoxError from '../../../components/ui/BoxError';
import { createNilai } from '../../../api/nilai';
import { SELECT_PREDIKAT } from '../../../config/nilai';
import InputSelect from '../../../components/form/InputSelect';
import NamaGuru from './components/NamaGuru';

function NewNilai() {
  useTitle('Tambah Nilai');
  const [guruID, setGuruID] = useState('');
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [siswaID, setSiswaID] = useState('');
  const [nilai, setNilai] = useState('');
  const [predikat, setPredikat] = useState('');
  const [catatan, setCatatan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function createNewNilai(formData) {
    setIsError(false);
    setIsLoading(true);
    try {
      await createNilai(formData);
      // const response = await createNilai(formData);
      // const data = response.data.data;
      // console.log(data);
      // console.log('created new nilai');
      navigate('/penilaian', {
        state: { success: true, message: 'Berhasil menambahkan nilai siswa' },
        replace: true,
      });
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

  function submitNewNilai(e) {
    e.preventDefault();
    if (!checkInput()) setIsError(true);
    const formData = {
      siswa_id: siswaID,
      semester_id: kodeSemester,
      kelas_id: kodeKelas,
      matapelajaran_id: kodeMataPelajaran,
      guru_id: guruID,
      nilai: nilai,
      predikat: predikat,
      catatan: catatan,
    };
    // console.log(formData);
    createNewNilai(formData);
    return;
  }

  function checkInput() {
    if (guruID === '') {
      setErrorMessage('Nama guru harus diisi');
      return false;
    }
    if (kodeSemester === '') {
      setErrorMessage('Semester harus Diisi');
      return false;
    }
    if (kodeKelas === '') {
      setErrorMessage('Kelas harus diisi');
      return false;
    }
    if (kodeMataPelajaran === '') {
      setErrorMessage('Mata pelajaran harus diisi');
      return false;
    }
    if (siswaID === '') {
      setErrorMessage('Nama siswa harus diisi');
      return false;
    }
    if (nilai === '') {
      setErrorMessage('Nilai harus diisi');
      return false;
    }
    if (predikat === '') {
      setErrorMessage('Predikat harus diisi');
      return false;
    }
    if (catatan === null) {
      setErrorMessage('Catatan harus diisi');
      return false;
    }
    return true;
  }

  useEffect(() => {
    setIsError(false);
    setErrorMessage('');
    return;
  }, [
    kodeSemester,
    kodeKelas,
    kodeMataPelajaran,
    siswaID,
    nilai,
    predikat,
    catatan,
  ]);

  useEffect(() => {
    if (
      guruID === '' ||
      kodeSemester === '' ||
      kodeKelas === '' ||
      kodeMataPelajaran === '' ||
      siswaID === '' ||
      nilai === '' ||
      predikat === '' ||
      catatan === '' ||
      isLoading ||
      isError
    )
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [
    guruID,
    kodeSemester,
    kodeKelas,
    kodeMataPelajaran,
    siswaID,
    nilai,
    predikat,
    catatan,
    isLoading,
    isError,
  ]);

  function cancelNewNilai() {
    navigate('/penilaian');
  }

  return (
    <>
      <Header>Tambah Nilai</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={submitNewNilai}>
            <NamaGuru SetGuruID={setGuruID} />
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {/* SEMESTER */}
              <SelectSemester SetKodeSemester={setKodeSemester} />
              {/* KELAS */}
              <SelectKelas SetKodeKelas={setKodeKelas} />
              {/* MATA PELAJARAN */}
              <SelectMataPelajaran
                SetKodeMataPelajaran={setKodeMataPelajaran}
              />
              {/* NAMA SISWA */}
              <SearchNamaSiswa SetSiswaID={setSiswaID} />
              {/* NILAI */}
              <InputField
                HtmlFor="nilai"
                Type="text"
                Value={nilai}
                Placeholder="nilai"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNilai(e.target.value);
                }}
              >
                Nilai
                <InputRequired />
              </InputField>
              {/* PREDIKAT NILAI */}
              <InputSelect
                Options={SELECT_PREDIKAT}
                HtmlFor={'jenis-kelamin'}
                PlaceHolder={'Pilih Predikat Nilai'}
                Required={true}
                Value={predikat}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setPredikat(e.target.value);
                }}
              >
                Predikat Nilai
                <InputRequired />
              </InputSelect>
              {/* CATATAN */}
              <InputTextarea
                HtmlFor="catatan"
                Placeholder="catatan penilaian"
                Required={true}
                Value={catatan}
                OnChange={(e) => setCatatan(e.target.value)}
              >
                Catatan
                <InputRequired />
              </InputTextarea>
            </div>
            <div className="flex gap-2 sm:gap-4 justify-end sm:justify-center">
              <Button Type="submit" Disabled={isInputValid ? false : true}>
                Simpan
              </Button>
              <Button OnClick={() => cancelNewNilai()} ButtonStyle="DANGER">
                Batal
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default NewNilai;
