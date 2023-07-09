import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import BoxError from '../../../../components/ui/BoxError';
import InputSelect from '../../../../components/form/InputSelect';
import jwtDecode from 'jwt-decode';
import { getUser } from '../../../../api/users';
import InputRequired from '../../../../components/form/InputRequired';
import { CustomError } from '../../../../utils/CustomError';

function SelectMataPelajaran({ SetKodeMataPelajaran }) {
  const getAccessToken = localStorage.getItem('accessToken');
  const decodeAccessToken = jwtDecode(getAccessToken);

  const [dataMataPelajaran, setDataMataPelajaran] = useState(null);
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(true);

  async function fetchAllMataPelajaran() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getUser(decodeAccessToken?.id);
      const data = response.data.data;
      const dataResMataPelajaran = data?.guru[0]?.matapelajaran;
      if (!dataResMataPelajaran)
        throw new CustomError(404, 'Anda belum memiliki mata pelajaran');
      const listMataPelajaran = listArray(dataResMataPelajaran);
      setDataMataPelajaran(listMataPelajaran);
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
      fetchAllMataPelajaran();
    }

    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (mataPelajaran) return SetKodeMataPelajaran(mataPelajaran);
    return SetKodeMataPelajaran('');
  }, [mataPelajaran]);

  function listArray(arr) {
    return arr.map((item) => {
      return { id: item.id, name: item.nama };
    });
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      {dataMataPelajaran && (
        <InputSelect
          HtmlFor={'mata-pelajaran'}
          PlaceHolder={'Pilih Mata Pelajaran'}
          Options={dataMataPelajaran}
          Value={mataPelajaran}
          OnChange={(e) => setMataPelajaran(e.target.value)}
        >
          Mata Pelajaran
          <InputRequired />
        </InputSelect>
      )}
    </>
  );
}

SelectMataPelajaran.propTypes = {
  SetKodeMataPelajaran: PropTypes.func,
};

export default SelectMataPelajaran;
