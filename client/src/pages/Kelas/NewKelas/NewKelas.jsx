import { useEffect, useState } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { createKelas } from '../../../api/kelas';
import Header from '../components/Header';
import Container from '../components/Container';
import Form from '../../../components/form/Form';
import InputField from '../../../components/form/InputField';
import BoxError from '../../../components/ui/BoxError';
import InputSelect from '../../../components/form/InputSelect';
import Button from '../../../components/ui/Button';
import InputRequired from '../../../components/form/InputRequired';

const TINGKAT_KELAS = [
  { id: '7', name: '7' },
  { id: '8', name: '8' },
  { id: '9', name: '9' },
];

const KODE = [
  { id: 'A', name: 'A' },
  { id: 'B', name: 'B' },
  { id: 'C', name: 'C' },
  { id: 'D', name: 'D' },
  { id: 'E', name: 'E' },
  { id: 'F', name: 'F' },
  { id: 'G', name: 'G' },
  { id: 'H', name: 'H' },
];

function NewKelas() {
  useTitle('Tambah Kelas');
  const [kodeKelas, setKodeKelas] = useState('');
  const [tingkatKelas, setTingkatKelas] = useState('');
  const [kode, setKode] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function createNewKelas(formData) {
    setIsError(false);
    setIsloading(true);
    try {
      const response = await createKelas(formData);
      console.log(response);
      navigate('/kelas');
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

  function submitNewKelas(e) {
    e.preventDefault();

    if (tingkatKelas === '') {
      setIsError(true);
      setErrorMessage('Kelas harus dipilih');
      return;
    }

    if (kode === '') {
      setIsError(true);
      setErrorMessage('Kode harus dipilih');
      return;
    }

    if (kodeKelas !== tingkatKelas + kode) {
      setIsError(true);
      setErrorMessage('kode kelas tidak valid');
      return;
    }

    const formData = {
      kelas: tingkatKelas,
      kode: kode,
    };
    console.log(formData);
    createNewKelas(formData);
  }

  useEffect(() => {
    if (tingkatKelas && kode) return setKodeKelas(`${tingkatKelas}${kode}`);
    return;
  }, [tingkatKelas, kode]);

  useEffect(() => {
    setIsError(false);
    setErrorMessage('');
    return;
  }, [kodeKelas, tingkatKelas, kode]);

  useEffect(() => {
    if (kodeKelas === '' || tingkatKelas === '' || kode === '' || isError) {
      return setIsInputValid(false);
    }
    return setIsInputValid(true);
  }, [kodeKelas, tingkatKelas, kode, isError]);

  function cancelNewKelas() {
    navigate('/kelas');
  }

  return (
    <>
      <Header>Tambah User</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={(e) => submitNewKelas(e)}>
            <InputField
              HtmlFor="kode-kelas"
              Type="text"
              Value={kodeKelas}
              Placeholder="Pilihlah kelas dan kode"
              Required={true}
              Disabled={true}
              OnChange={(e) => {
                setKodeKelas(e.target.value);
              }}
            >
              Kode Kelas
            </InputField>
            <InputSelect
              Options={TINGKAT_KELAS}
              HtmlFor={'tingkat-kelas'}
              PlaceHolder={'Kelas'}
              Required={true}
              OnChange={(e) => {
                setTingkatKelas(e.target.value);
              }}
            >
              Pilih Kelas
              <InputRequired />
            </InputSelect>
            <InputSelect
              Options={KODE}
              HtmlFor={'kode'}
              PlaceHolder={'Kode'}
              Required={true}
              Disabled={tingkatKelas ? false : true}
              OnChange={(e) => {
                setKode(e.target.value);
              }}
            >
              Pilih Kode
              <InputRequired />
            </InputSelect>
            <div className="flex gap-2 sm:gap-4 justify-end sm:justify-center">
              <Button Type="submit" Disabled={isInputValid ? false : true}>
                Simpan
              </Button>
              <Button OnClick={() => cancelNewKelas()} ButtonStyle="DANGER">
                Batal
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default NewKelas;
