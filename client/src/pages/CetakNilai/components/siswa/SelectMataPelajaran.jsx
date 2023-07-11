import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { getAllMataPelajaran } from '../../../../api/mataPelajaran';
import InputSelect from '../../../../components/form/InputSelect';
import BoxError from '../../../../components/ui/BoxError';
import { CustomError } from '../../../../utils/CustomError';

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
      const data = response?.data?.data;
      const listMataPelajaran = listArray(data?.mataPelajaran, 'nama');
      if (listMataPelajaran.length === 0)
        throw new CustomError(404, 'Belum ada mata pelajaran yang tersedia');
      const filteredMataPelajaran = filterByValue(listMataPelajaran, 'id');
      setDataMataPelajaran(filteredMataPelajaran);
    } catch (error) {
      setIsError(true);
      if (error?.statusCode === 404) return setErrorMessage(error?.message);
      if (error?.response?.status === 500)
        return setErrorMessage('Something went wrong');
      if (error?.response)
        return setErrorMessage(error?.response?.data?.message);
      return setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  function listArray(arr, prop) {
    return arr.map((item) => {
      return { id: item?.id, name: item?.[prop] };
    });
  }

  function filterByValue(arr, prop) {
    const result = [];
    const map = new Map();

    for (const obj of arr) {
      const value = obj[prop];
      if (!map.has(value)) {
        map.set(value, true);
        result.push(obj);
      }
    }

    return result;
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

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      {dataMataPelajaran && (
        <>
          <InputSelect
            HtmlFor={'mata-pelajaran'}
            PlaceHolder={'Semua'}
            SelectSize="SMALL"
            Options={dataMataPelajaran}
            Value={mataPelajaran}
            OnChange={(e) => setMataPelajaran(e.target.value)}
          >
            Mata Pelajaran
          </InputSelect>
        </>
      )}
    </>
  );
}

SelectMataPelajaran.propTypes = {
  SetKodeMataPelajaran: PropTypes.func,
};

export default SelectMataPelajaran;
