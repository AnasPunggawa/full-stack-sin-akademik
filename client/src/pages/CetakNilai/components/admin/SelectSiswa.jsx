import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { getAllNilai } from '../../../../api/nilai';
import { CustomError } from '../../../../utils/CustomError';
import BoxError from '../../../../components/ui/BoxError';
import InputSelect from '../../../../components/form/InputSelect';

function SelectSiswa({ KodeSemester, KodeKelas, SetSiswaId }) {
  const [dataSiswa, setDataSiswa] = useState(null);
  const [siswa, setSiswa] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(true);

  async function fetchAllMataPelajaran() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getAllNilai(
        '',
        '',
        KodeSemester,
        KodeKelas,
        '',
        1,
        1000
      );
      const data = response?.data?.data;
      const listSiswa = listArray(data?.nilai);
      if (listSiswa.length === 0)
        throw new CustomError(404, 'Belum ada siswa yang memiliki nilai');
      const filteredSiswa = filterByValue(listSiswa, 'id');
      setDataSiswa(filteredSiswa);
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

  function listArray(arr) {
    return arr.map((item) => {
      return { id: item?.siswa?.id, name: item?.siswa?.nama };
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
    if (siswa) return SetSiswaId(siswa);
    return SetSiswaId('');
  }, [siswa]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      {dataSiswa && (
        <>
          <InputSelect
            HtmlFor={'siswa'}
            PlaceHolder={'Pilih Siswa'}
            SelectSize="SMALL"
            Options={dataSiswa}
            Value={siswa}
            OnChange={(e) => setSiswa(e.target.value)}
          >
            Nama Siswa
          </InputSelect>
        </>
      )}
    </>
  );
}

SelectSiswa.propTypes = {
  KodeSemester: PropTypes.string,
  KodeKelas: PropTypes.string,
  SetSiswaId: PropTypes.func,
};

export default SelectSiswa;
