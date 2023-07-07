import PropTypes from 'prop-types';
import InputSelect from '../../../../components/form/InputSelect';
import { useEffect, useRef, useState } from 'react';
import { getAllMataPelajaran } from '../../../../api/mataPelajaran';
import BoxError from '../../../../components/ui/BoxError';

function SelectMataPelajaran({ SetKodeMataPelajaran }) {
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
      const response = await getAllMataPelajaran('', 1, 100);
      const data = response.data.data;
      const listMataPelajaran = listArray(data?.mataPelajaran);
      setDataMataPelajaran(listMataPelajaran);
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
          SelectSize="SMALL"
          Options={dataMataPelajaran}
          Value={mataPelajaran}
          OnChange={(e) => setMataPelajaran(e.target.value)}
        >
          Mata Pelajaran
        </InputSelect>
      )}
    </>
  );
}

SelectMataPelajaran.propTypes = {
  SetKodeMataPelajaran: PropTypes.func,
};

export default SelectMataPelajaran;
