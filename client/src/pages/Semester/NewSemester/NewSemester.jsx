import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import Header from '../components/Header';
import Container from '../components/Container';
import BoxError from '../../../components/ui/BoxError';
import InputField from '../../../components/form/InputField';
import InputSelect from '../../../components/form/InputSelect';
import Button from '../../../components/ui/Button';
import Form from '../../../components/form/Form';
import { createSemester } from '../../../api/semester';
import InputRequired from '../../../components/form/InputRequired';
import { SELECT_SEMESTER } from '../../../config/semester';

// const SELECT_SEMESTER = [
//   { id: 'ganjil', name: 'Ganjil' },
//   { id: 'genap', name: 'Genap' },
// ];

function EXAMPLE_TAHUN_AJARAN() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  if (currentMonth <= 6) return `${currentYear - 1}/${currentYear}`;
  return `${currentYear}/${currentYear + 1}`;
}

function NewSemester() {
  useTitle('Tambah Semester');
  const [kodeSemester, setKodeSemester] = useState('');
  const [tahunAjaran, setTahunAjaran] = useState('');
  const [semester, setSemester] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const placeholderTahunAjaran = EXAMPLE_TAHUN_AJARAN();

  const navigate = useNavigate();

  async function createNewSemester(formData) {
    setIsError(false);
    setIsloading(true);
    try {
      await createSemester(formData);
      // const response = await createSemester(formData);
      // console.log(response);
      navigate('/semester', {
        state: { success: true, message: 'Berhasil menambahkan semester' },
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

  function submitNewSemester(e) {
    e.preventDefault();

    if (tahunAjaran === '') {
      setIsError(true);
      setErrorMessage('Tahun ajaran harus diisi');
      return;
    }
    if (semester === '') {
      setIsError(true);
      setErrorMessage('Semester harus dipilih');
      return;
    }

    if (kodeSemester !== `${tahunAjaran}-${semester}`) {
      setIsError(true);
      setErrorMessage('kode semester tidak valid');
      return;
    }

    const formData = {
      tahunAjaran: tahunAjaran,
      semester: semester,
      status: true,
    };
    // console.log(formData);
    createNewSemester(formData);
  }

  useEffect(() => {
    if (tahunAjaran && semester)
      return setKodeSemester(`${tahunAjaran}-${semester}`);
    return setKodeSemester('');
  }, [tahunAjaran, semester]);

  useEffect(() => {
    setIsError(false);
    setErrorMessage('');
    return;
  }, [kodeSemester, tahunAjaran, semester]);

  useEffect(() => {
    if (
      kodeSemester === '' ||
      tahunAjaran === '' ||
      semester === '' ||
      isLoading ||
      isError
    ) {
      return setIsInputValid(false);
    }
    return setIsInputValid(true);
  }, [kodeSemester, tahunAjaran, semester, isLoading, isError]);

  function cancelNewSemester() {
    navigate('/semester');
  }

  return (
    <>
      <Header>Tambah Semester</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={(e) => submitNewSemester(e)}>
            <InputField
              HtmlFor="kode-kelas"
              Type="text"
              Value={kodeSemester}
              Placeholder="Masukkan tahun ajaran dan semester"
              Required={true}
              Disabled={true}
              OnChange={(e) => {
                setKodeSemester(e.target.value);
              }}
            >
              Kode Semester
            </InputField>
            <InputField
              HtmlFor="tahun-ajaran"
              Type="text"
              Value={tahunAjaran}
              Placeholder={placeholderTahunAjaran}
              Required={true}
              OnChange={(e) => {
                setTahunAjaran(e.target.value);
              }}
            >
              Tahun Ajaran
              <InputRequired>contoh: {placeholderTahunAjaran}</InputRequired>
            </InputField>
            <InputSelect
              Options={SELECT_SEMESTER}
              HtmlFor={'semester'}
              PlaceHolder={'Pilih Semester'}
              Required={true}
              OnChange={(e) => {
                setSemester(e.target.value);
              }}
            >
              Semester
              <InputRequired />
            </InputSelect>
            <div className="flex gap-2 sm:gap-4 justify-end sm:justify-center">
              <Button Type="submit" Disabled={isInputValid ? false : true}>
                Simpan
              </Button>
              <Button OnClick={() => cancelNewSemester()} ButtonStyle="DANGER">
                Batal
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default NewSemester;
