import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { getAllNilai } from '../../../../api/nilai';
import BoxError from '../../../../components/ui/BoxError';
import InputSelect from '../../../../components/form/InputSelect';
import InputRequired from '../../../../components/form/InputRequired';
import { CustomError } from '../../../../utils/CustomError';
import InputField from '../../../../components/form/InputField';

function SelectSemester({ SiswaId, SetKodeSemester, SetKodeKelas }) {
  const [dataSemester, setDataSemester] = useState(null);
  const [tahunAjaranSemester, setTahunAjaranSemester] = useState('');
  const [kelas, setKelas] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(true);

  async function fetchAllSemester() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getAllNilai('', SiswaId, '', '', '', 1, 250);
      const data = response.data.data;
      const listSemester = listArray(data?.nilai);
      if (listSemester.length === 0)
        throw new CustomError(404, 'Belum ada semester yang tersedia');
      const filteredSemester = filterByValue(listSemester, 'id');
      setDataSemester(filteredSemester);
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

  function listArray(arr) {
    return arr.map((item) => {
      const arrSemester = item?.semester?.kodeSemester.split('-');
      const semester = arrSemester[0];
      const kode =
        arrSemester[1].charAt(0).toUpperCase() + arrSemester[1].slice(1);
      const kodeSemester = `${semester} - ${kode}`;
      return {
        id: item?.semester?.id,
        // name: item?.semester?.kodeSemester,
        name: kodeSemester,
        kelas_id: item?.kelas?.id,
        kelas: item?.kelas?.kodeKelas,
      };
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
    if (tahunAjaranSemester) {
      dataSemester.find((item) => {
        if (item.id === tahunAjaranSemester) {
          setKelas(item.kelas);
          return SetKodeKelas(item.kelas_id);
        }
      });
      return SetKodeSemester(tahunAjaranSemester);
    }
    setKelas('');
    SetKodeKelas('');
    return SetKodeSemester('');
  }, [tahunAjaranSemester, dataSemester]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      {dataSemester && (
        <>
          {/* TAHUN AJARAN & SEMESTER */}
          <InputSelect
            HtmlFor={'tahun-ajaran-semester'}
            PlaceHolder={'Pilih Tahun Ajaran & Semester'}
            SelectSize="SMALL"
            Options={dataSemester}
            Value={tahunAjaranSemester}
            OnChange={(e) => setTahunAjaranSemester(e.target.value)}
          >
            Tahun Ajaran & Semester
            <InputRequired />
          </InputSelect>
          {/* KODE KELAS */}
          <InputField
            HtmlFor="kode-kelas"
            Type="text"
            Value={kelas}
            Placeholder="kode kelas"
            Required={true}
            Disabled={true}
            InputSize="SMALL"
            OnChange={() => {}}
          >
            Kode Kelas
          </InputField>
        </>
      )}
    </>
  );
}

SelectSemester.propTypes = {
  SiswaId: PropTypes.string,
  SetKodeSemester: PropTypes.func,
  SetKodeKelas: PropTypes.func,
};

export default SelectSemester;
