import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoxError from '../../../../../components/ui/BoxError';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import Button from '../../../../../components/ui/Button';
import { updateSemester } from '../../../../../api/semester';
import InputSelect from '../../../../../components/form/InputSelect';
import InputRequired from '../../../../../components/form/InputRequired';
import { SELECT_SEMESTER, SELECT_STATUS } from '../../../../../config/semester';

// const SELECT_SEMESTER = [
//   { id: 'ganjil', name: 'Ganjil' },
//   { id: 'genap', name: 'Genap' },
// ];

// const SELECT_STATUS = [
//   { id: true, name: 'Aktif' },
//   { id: false, name: 'Tidak Aktif' },
// ];

function EditData({ DataSemester }) {
  const { id, kodeSemester, tahunAjaran, semester, status } = DataSemester;
  const [namaKodeSemester, setNamaKodeSemester] = useState(kodeSemester);
  const [tahunAjaranSemester, setTahunAjaranSemester] = useState(tahunAjaran);
  const [tingkatSemester, setTingkatSemester] = useState(semester);
  const [statusSemester, setStatusSemester] = useState(status);
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
      const response = await updateSemester(id, formData);
      const data = response.data.data;
      // console.log(data);
      navigate(`/semester/${data.id}`, {
        state: {
          success: true,
          message: 'Berhasil mengubah data semester',
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

  function submitEditSemester(e) {
    e.preventDefault();

    if (tahunAjaranSemester === '') {
      setIsError(true);
      setErrorMessage('Tahun ajaran harus diisi');
      return;
    }

    if (tingkatSemester === '') {
      setIsError(true);
      setErrorMessage('Semester harus dipilih');
      return;
    }

    if (namaKodeSemester !== `${tahunAjaranSemester}-${tingkatSemester}`) {
      setIsError(true);
      setErrorMessage('kode semester tidak valid');
      return;
    }

    if (statusSemester === '') {
      setIsError(true);
      setErrorMessage('Status semester harus dipilih');
      return;
    }

    const formData = {
      ...DataSemester,
      tahunAjaran: tahunAjaranSemester,
      semester: tingkatSemester,
      status: statusSemester === 'true',
    };
    // console.log(formData);
    handleUpdateMataPelajaran(formData);
    return;
  }

  useEffect(() => {
    if (tahunAjaranSemester && tingkatSemester)
      return setNamaKodeSemester(`${tahunAjaranSemester}-${tingkatSemester}`);
    return setNamaKodeSemester('');
  }, [tahunAjaranSemester, tingkatSemester]);

  useEffect(() => {
    setIsError(false);
    setErrorMessage('');
    return;
  }, [namaKodeSemester, tahunAjaranSemester, tingkatSemester, statusSemester]);

  useEffect(() => {
    if (
      namaKodeSemester === '' ||
      tahunAjaranSemester === '' ||
      tingkatSemester === '' ||
      statusSemester === '' ||
      isLoading ||
      isError
    ) {
      return setIsInputValid(false);
    }
    return setIsInputValid(true);
  }, [
    namaKodeSemester,
    tahunAjaranSemester,
    tingkatSemester,
    statusSemester,
    isLoading,
    isError,
  ]);

  function cancelEditMataPelajaran() {
    navigate(`/semester/${id}`);
  }

  return (
    <div className="w-full h-full p-4 space-y-4 md:space-y-6">
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      <Form OnSubmit={(e) => submitEditSemester(e)}>
        <InputField
          HtmlFor="kode-semester"
          Type="text"
          Value={namaKodeSemester}
          Placeholder={kodeSemester}
          Required={true}
          Disabled={true}
          OnChange={(e) => setNamaKodeSemester(e.target.value)}
        >
          Kode Semester
        </InputField>
        <InputField
          HtmlFor="tahun-ajaran"
          Type="text"
          Value={tahunAjaranSemester}
          Placeholder={tahunAjaran}
          Required={true}
          OnChange={(e) => setTahunAjaranSemester(e.target.value)}
        >
          Tahun Ajaran
          <InputRequired>{tahunAjaran}</InputRequired>
        </InputField>
        <InputSelect
          Options={SELECT_SEMESTER}
          HtmlFor={'semester'}
          PlaceHolder={'Pilih Semester'}
          Required={true}
          Value={tingkatSemester}
          OnChange={(e) => {
            setTingkatSemester(e.target.value);
          }}
        >
          Semester
          <InputRequired>{semester}</InputRequired>
        </InputSelect>
        <InputSelect
          Options={SELECT_STATUS}
          HtmlFor={'status-semester'}
          PlaceHolder={'Pilih Status'}
          Required={true}
          Value={statusSemester}
          OnChange={(e) => {
            setStatusSemester(e.target.value);
          }}
        >
          Status
          <InputRequired>{status ? 'Aktif' : 'Tidak Aktif'}</InputRequired>
        </InputSelect>
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
  DataSemester: PropTypes.object,
};

export default EditData;
