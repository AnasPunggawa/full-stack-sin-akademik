import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { getAllSemester } from '../../../../api/semester';
import BoxError from '../../../../components/ui/BoxError';
import InputSelect from '../../../../components/form/InputSelect';
import { SELECT_SEMESTER } from '../../../../config/semester';

function SelectSemester({ SetKodeSemester }) {
  const [dataSemester, setDataSemester] = useState(null);
  const [tahunAjaran, setTahunAjaran] = useState('');
  const [semester, setSemester] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(true);

  async function fetchAllSemester() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getAllSemester('', '', 1, 100);
      const data = response.data.data;
      const listSemester = listArray(data?.semester);
      const filteredSemester = filterByValue(listSemester, 'id');
      setDataSemester(filteredSemester);
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

  function listArray(arr) {
    return arr.map((item) => {
      const idTahunAjaran = item?.tahunAjaran.split('/').join('-');
      return { id: idTahunAjaran, name: item?.tahunAjaran };
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
      fetchAllSemester();
    }

    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (tahunAjaran && semester)
      return SetKodeSemester(`${tahunAjaran}-${semester}`);
    return SetKodeSemester('');
  }, [tahunAjaran, semester]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      {dataSemester && (
        <>
          <InputSelect
            HtmlFor={'tahun-ajaran'}
            PlaceHolder={'Pilih Tahun Ajaran'}
            Options={dataSemester}
            Value={tahunAjaran}
            OnChange={(e) => setTahunAjaran(e.target.value)}
          >
            Tahun Ajaran
          </InputSelect>
          <InputSelect
            HtmlFor={'semester'}
            PlaceHolder={'Pilih Semester'}
            Options={SELECT_SEMESTER}
            Value={semester}
            OnChange={(e) => setSemester(e.target.value)}
          >
            Semester
          </InputSelect>
        </>
      )}
    </>
  );
}

SelectSemester.propTypes = {
  SetKodeSemester: PropTypes.func,
};

export default SelectSemester;