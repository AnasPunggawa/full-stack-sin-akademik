import { useEffect, useState } from 'react';
import Form from '../../../components/form/Form';
import InputField from '../../../components/form/InputField';
import Button from '../../../components/ui/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import BoxError from '../../../components/ui/BoxError';
import { createMataPelajaran } from '../../../api/mataPelajaran';
import { useTitle } from '../../../hooks/useTitle';
import InputRequired from '../../../components/form/InputRequired';

function NewMataPelajaran() {
  useTitle('Tambah Mata Pelajaran');

  const [namaMataPelajaran, setNamaMataPelajaran] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function handleCreateMataPelajaran(formData) {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const response = await createMataPelajaran(formData);
      const data = response.data.data;
      console.log(data);
      navigate('/mata-pelajaran', {
        state: {
          success: true,
          message: 'Berhasil menambahkan mata pelajaran',
        },
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

  function submitNewMataPelajaran(e) {
    e.preventDefault();

    if (namaMataPelajaran === '') {
      setIsError(true);
      setErrorMessage('Nama mata pelajaran tidak boleh kosong!');
      return;
    }

    const formData = {
      nama: namaMataPelajaran,
    };
    handleCreateMataPelajaran(formData);
    console.log(formData);
    return;
  }

  function cancelNewMataPelajaran() {
    navigate('/mata-pelajaran');
  }

  useEffect(() => {
    setIsError(false);
    setErrorMessage('');
    if (namaMataPelajaran === '') return setIsInputValid(false);
    return setIsInputValid(true);
  }, [namaMataPelajaran]);

  return (
    <>
      <Header>Tambah Mata Pelajaran</Header>
      <Container>
        <div className={'p-5 sm:p-7 space-y-4 md:space-y-6'}>
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={(e) => submitNewMataPelajaran(e)}>
            <InputField
              HtmlFor="namaMataPelajaran"
              Type="text"
              Placeholder="Nama Mata Pelajaran"
              Value={namaMataPelajaran}
              OnChange={(e) => setNamaMataPelajaran(e.target.value)}
              Required={true}
            >
              Nama Mata Pelajaran
              <InputRequired />
            </InputField>
            <div className="flex gap-2 md:gap-4 justify-end sm:justify-center">
              <Button
                Type="submit"
                ButtonStyle="PRIMARY"
                Disabled={isInputValid ? false : true}
              >
                Simpan
              </Button>
              <Button
                OnClick={() => cancelNewMataPelajaran()}
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

export default NewMataPelajaran;
