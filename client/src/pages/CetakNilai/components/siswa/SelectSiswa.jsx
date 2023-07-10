import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { getUser } from '../../../../api/users';
import jwtDecode from 'jwt-decode';
import BoxError from '../../../../components/ui/BoxError';
import InputField from '../../../../components/form/InputField';
import { CustomError } from '../../../../utils/CustomError';

function SelectSiswa({ SetSiswaId }) {
  const getAccessToken = localStorage.getItem('accessToken');
  const decodeAccessToken = jwtDecode(getAccessToken);
  const [dataSiswa, setDataSiswa] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(true);

  async function fetchDataUser() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getUser(decodeAccessToken?.id);
      const data = response.data.data;
      if (data?.siswa[0].length === 0)
        throw new CustomError(404, 'Siswa belum terdaftar');
      setDataSiswa(data?.siswa[0]);
      SetSiswaId(data?.siswa[0]?.id);
    } catch (error) {
      setIsError(true);
      if (error.statusCode === 404) return setErrorMessage(error.message);
      if (error.response.status === 500)
        return setErrorMessage('Something went wrong');
      if (error.response) return setErrorMessage(error.response.data.message);
      return setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchDataUser();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      {dataSiswa && (
        <>
          {/* NAMA SISWA */}
          <InputField
            HtmlFor="nama-siswa"
            Type="text"
            Value={dataSiswa?.nama}
            Placeholder={dataSiswa?.nama}
            Required={true}
            Disabled={true}
            InputSize="SMALL"
            OnChange={() => {}}
          >
            Nama
          </InputField>
          {/* NISN SISWA */}
          <InputField
            HtmlFor="nisn-siswa"
            Type="text"
            Value={dataSiswa?.nisn}
            Placeholder={dataSiswa?.nisn}
            Required={true}
            Disabled={true}
            InputSize="SMALL"
            OnChange={() => {}}
          >
            NISN
          </InputField>
        </>
      )}
    </>
  );
}

SelectSiswa.propTypes = {
  SetSiswaId: PropTypes.func,
};

export default SelectSiswa;
