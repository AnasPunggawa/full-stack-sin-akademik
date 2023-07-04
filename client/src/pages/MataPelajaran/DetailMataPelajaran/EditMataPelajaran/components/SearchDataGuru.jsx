import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import InputField from '../../../../../components/form/InputField';
import { getAllGuru } from '../../../../../api/guru';
import BoxError from '../../../../../components/ui/BoxError';

function SearchDataGuru({ ListGuru, SetListGuru }) {
  const [searchGuru, setSearchGuru] = useState('');
  const [resultSearchGuru, setResultSearchGuru] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState(ListGuru);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSearchGuru(namaGuru) {
    setIsLoading(true);
    try {
      const response = await getAllGuru(namaGuru, 1, 10);
      const data = response.data.data;
      setResultSearchGuru(data.guru);
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
    setResultSearchGuru([]);
    if (searchGuru.length >= 4) {
      setIsLoading(true);
      const timeOut = setTimeout(() => {
        handleSearchGuru(searchGuru);
      }, 250);
      return () => {
        clearTimeout(timeOut);
        setIsLoading(false);
      };
    }

    return () => {
      setResultSearchGuru([]);
    };
  }, [searchGuru]);

  useEffect(() => {
    SetListGuru(selectedGuru);
    return;
  }, [selectedGuru]);

  useEffect(() => {
    setSelectedGuru(ListGuru);
    return;
  }, [ListGuru]);

  function addGuru(id, nip, nama) {
    console.log(ListGuru);
    console.log(selectedGuru);
    // setIsError(false);
    const selectedGuruExist = guruExist(id);
    if (selectedGuruExist) {
      setIsError(true);
      setErrorMessage(`guru ${nama} sudah ada`);
      return;
    }
    setSelectedGuru((prevState) => [...prevState, { id, nip, nama }]);
    setSearchGuru('');
    setResultSearchGuru([]);
    return;
  }

  function guruExist(id) {
    return selectedGuru.some((selectedGuru) => selectedGuru.id === id);
  }

  return (
    <div className="relative w-full">
      <InputField
        HtmlFor="search-guru"
        Type="text"
        Placeholder="Cari Nama Guru"
        Value={searchGuru}
        OnChange={(e) => setSearchGuru(e.target.value)}
        Required={false}
      />
      <div className="absolute z-50 w-full overflow-auto max-h-40 md:w-4/6 bg-white dark:bg-gray-500 rounded-b-md">
        {isLoading && <p className=" px-4 py-2.5">Loading...</p>}
        {isError && <BoxError>{errorMessage}</BoxError>}
        {resultSearchGuru?.length > 0 && (
          <ul className=" px-4 py-2.5">
            {resultSearchGuru?.map((item) => {
              return (
                <li
                  key={item.id}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-400 rounded-md"
                  onClick={() => addGuru(item.id, item.nip, item.nama)}
                >
                  <h3 className="text-sm font-semibold">{item.nama}</h3>
                  <p className="text-xs font-thin">NIP. {item.nip}</p>
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

SearchDataGuru.propTypes = {
  ListGuru: PropTypes.array,
  SetListGuru: PropTypes.func,
};

export default SearchDataGuru;
