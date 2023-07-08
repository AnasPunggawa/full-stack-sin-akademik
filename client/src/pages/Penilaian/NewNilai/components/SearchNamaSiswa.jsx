import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form/InputField';
import InputRequired from '../../../../components/form/InputRequired';
import BoxError from '../../../../components/ui/BoxError';
import { getAllSiswa } from '../../../../api/siswa';

function SearchNamaSiswa({ SetSiswaID }) {
  const [nama, setNama] = useState('');
  const [resultSearchNamaSiswa, setResultSearchNamaSiswa] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSearchNamaSiswa(nama) {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await getAllSiswa(nama, 1, 10);
      const data = response.data.data;
      setResultSearchNamaSiswa(data.siswa);
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
    setIsError(false);
    setErrorMessage('');
    if (nama.length >= 4) {
      setIsLoading(true);
      const timeOut = setTimeout(() => {
        handleSearchNamaSiswa(nama);
      }, 250);
      return () => {
        clearTimeout(timeOut);
        setIsLoading(false);
      };
    }
    SetSiswaID('');
    return () => {
      setResultSearchNamaSiswa([]);
    };
  }, [nama]);

  function addNamaSiswa({ id, nama }) {
    setNama(nama);
    SetSiswaID(id);
    setResultSearchNamaSiswa([]);
  }

  return (
    <div className="w-full relative">
      <InputField
        HtmlFor="nama"
        Type="text"
        Value={nama}
        Placeholder="nama"
        Required={false}
        OnChange={(e) => {
          setNama(e.target.value);
        }}
      >
        Nama Siswa
        <InputRequired />
      </InputField>
      <div className="absolute z-50 w-full overflow-auto max-h-40  bg-white dark:bg-gray-500 rounded-md">
        {isLoading && <p className=" px-4 py-2.5">Loading...</p>}
        {isError && <BoxError>{errorMessage}</BoxError>}
        {resultSearchNamaSiswa?.length > 0 && (
          <ul className=" px-4 py-2.5">
            {resultSearchNamaSiswa?.map((item) => {
              return (
                <li
                  key={item.id}
                  className="p-2 rounded-md hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400"
                  onClick={() => addNamaSiswa(item)}
                >
                  <h3 className="text-sm font-semibold">Nama: {item.nama}</h3>
                  <p className="text-xs font-thin">NISN: {item.nisn}</p>
                  <hr />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

SearchNamaSiswa.propTypes = {
  SetSiswaID: PropTypes.func.isRequired,
};

export default SearchNamaSiswa;
