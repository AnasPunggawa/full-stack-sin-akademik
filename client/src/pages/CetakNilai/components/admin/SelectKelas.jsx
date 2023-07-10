import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { getAllKelas } from '../../../../api/kelas';
import { CustomError } from '../../../../utils/CustomError';
import InputSelect from '../../../../components/form/InputSelect';
import BoxError from '../../../../components/ui/BoxError';

function SelectKelas({ SetKodeKelas }) {
  const [dataKelas, setDataKelas] = useState(null);
  const [dataKode, setDataKode] = useState(null);
  const [kelas, setKelas] = useState('');
  const [kode, setKode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(true);

  async function fetchAllKelas() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getAllKelas('', '', 1, 100);
      const data = response.data.data;
      const listKelas = listArray(data?.kelas, 'kelas');
      const listKode = listArray(data?.kelas, 'kode');
      if (listKelas.length === 0 || listKode.length === 0)
        throw new CustomError(404, 'Belum ada kelas yang tersedia');
      const filteredKelas = filterByValue(listKelas, 'id');
      const filteredKode = filterByValue(listKode, 'id');
      setDataKelas(filteredKelas);
      setDataKode(filteredKode);
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

  function listArray(arr, prop) {
    return arr.map((item) => {
      return { id: item?.[prop], name: item?.[prop] };
    });
  }

  function filterByValue(arr, prop) {
    const result = [];
    if (arr.length === 0) return result;

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
      fetchAllKelas();
    }

    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (kelas && kode) return SetKodeKelas(`${kelas}-${kode.toLowerCase()}`);
    return SetKodeKelas('');
  }, [kelas, kode]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      {!isError && dataKelas && dataKode && (
        <>
          <InputSelect
            HtmlFor={'kelas'}
            PlaceHolder={'Pilih Kelas'}
            SelectSize="SMALL"
            Options={dataKelas}
            // Options={SELECT_KELAS}
            Value={kelas}
            OnChange={(e) => setKelas(e.target.value)}
          >
            Kelas
          </InputSelect>
          <InputSelect
            HtmlFor={'kode'}
            PlaceHolder={'Pilih Kode'}
            SelectSize="SMALL"
            Options={dataKode}
            // Options={SELECT_KODE}
            Value={kode}
            OnChange={(e) => setKode(e.target.value)}
          >
            Kode
          </InputSelect>
        </>
      )}
    </>
  );
}

SelectKelas.propTypes = {
  SetKodeKelas: PropTypes.func,
};

export default SelectKelas;
