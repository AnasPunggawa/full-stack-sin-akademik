import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import TableDataGuru from './TableDataGuru';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import TableEditDataGuru from './TableEditDataGuru';
import Button from '../../../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { updateMataPelajaran } from '../../../../../api/mataPelajaran';
import BoxError from '../../../../../components/ui/BoxError';
import InputRequired from '../../../../../components/form/InputRequired';

function EditData({ DataMataPelajaran }) {
  const { id, nama, guru } = DataMataPelajaran;
  const [namaMataPelajaran, setNamaMataPelajaran] = useState(nama);
  const [dataGuru, setDataGuru] = useState(guru);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function handleUpdateMataPelajaran(formData) {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const response = await updateMataPelajaran(id, formData);
      const data = response.data.data;
      // console.log(data);
      navigate(`/mata-pelajaran/${data.id}`, {
        state: {
          success: true,
          message: 'Berhasil mengubah data mata pelajaran',
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

  function submitEditMataPelajaran(e) {
    e.preventDefault();

    if (namaMataPelajaran === '') {
      setIsError(true);
      setErrorMessage('Nama mata pelajaran tidak boleh kosong!');
      return;
    }

    const formData = {
      ...DataMataPelajaran,
      nama: namaMataPelajaran,
      guru: dataGuru?.map((nmGuru) => {
        return { id: nmGuru.id };
      }),
    };
    // console.log(formData);
    handleUpdateMataPelajaran(formData);
    return;
  }

  useEffect(() => {
    setIsError(false);
    setErrorMessage('');
    // if (namaMataPelajaran === '') return setIsInputValid(false);
    // return setIsInputValid(true);
  }, [namaMataPelajaran]);

  useEffect(() => {
    if (namaMataPelajaran === '' || isLoading || isError)
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [namaMataPelajaran, isLoading, isError]);

  function cancelEditMataPelajaran() {
    navigate(`/mata-pelajaran/${id}`);
  }

  return (
    <div className="w-full h-full p-4 space-y-4 md:space-y-6">
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      <Form OnSubmit={(e) => submitEditMataPelajaran(e)}>
        <InputField
          HtmlFor="nama-mata-pelajaran"
          Type="text"
          Value={namaMataPelajaran}
          Placeholder="Nama Mata Pelajaran"
          Required={true}
          Disabled={false}
          OnChange={(e) => setNamaMataPelajaran(e.target.value)}
        >
          Nama Mata Pelajaran
          <InputRequired />
        </InputField>
        <div className="w-full">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Data Guru
          </p>
          <TableEditDataGuru DataGuru={dataGuru} SetDataGuru={setDataGuru} />
        </div>
        <div className="flex gap-2 md:gap-4 justify-end sm:justify-center">
          <Button
            Type="submit"
            ButtonStyle="PRIMARY"
            Disabled={isInputValid ? false : true}
          >
            Simpan
          </Button>
          <Button
            OnClick={() => cancelEditMataPelajaran()}
            ButtonStyle="DANGER"
          >
            Batal
          </Button>
        </div>
      </Form>
    </div>
  );
}

EditData.propTypes = {
  DataMataPelajaran: PropTypes.object,
};

export default EditData;
