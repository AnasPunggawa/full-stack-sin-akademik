import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateNilai } from '../../../../../api/nilai';
import BoxError from '../../../../../components/ui/BoxError';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import InputRequired from '../../../../../components/form/InputRequired';
import InputSelect from '../../../../../components/form/InputSelect';
import { SELECT_PREDIKAT } from '../../../../../config/nilai';
import InputTextarea from '../../../../../components/form/InputTextarea';
import Button from '../../../../../components/ui/Button';

function EditData({ NilaiSiswa }) {
  const {
    id,
    nilai: currentNilai,
    predikat: currentPredikat,
    catatan: currentCatatan,
  } = NilaiSiswa;

  const [nilai, setNilai] = useState(currentNilai);
  const [predikat, setPredikat] = useState(currentPredikat);
  const [catatan, setCatatan] = useState(currentCatatan);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function handleUpdateNilai(formData) {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const response = await updateNilai(id, formData);
      const data = response.data.data;
      console.log(data);
      console.log('updated nilai siswa');
      navigate(`/penilaian/${data.id}`, {
        state: { message: 'Berhasil mengubah nilai siswa' },
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

  function submitEditNilaiSiswa(e) {
    e.preventDefault();
    if (!checkInput()) return setIsError(true);
    const formData = {
      ...NilaiSiswa,
      nilai,
      predikat,
      catatan,
    };
    console.log(formData);
    handleUpdateNilai(formData);
    return;
  }

  function checkInput() {
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
  }, [nilai, predikat, catatan]);

  useEffect(() => {
    if (nilai === '' || predikat === '' || catatan === '' || isError)
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [nilai, predikat, catatan, isError]);

  function cancelEditNilaiSiswa() {
    navigate(`/penilaian/${id}`);
  }

  return (
    <div className="w-full h-full p-4 space-y-4 md:space-y-6">
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      <Form OnSubmit={submitEditNilaiSiswa}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
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
          <Button OnClick={() => cancelEditNilaiSiswa()} ButtonStyle="DANGER">
            Batal
          </Button>
        </div>
      </Form>
    </div>
  );
}

EditData.propTypes = {
  NilaiSiswa: PropTypes.object,
};

export default EditData;
