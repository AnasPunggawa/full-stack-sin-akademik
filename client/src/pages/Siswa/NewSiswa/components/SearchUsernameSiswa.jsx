import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form/InputField';
import InputRequired from '../../../../components/form/InputRequired';
import BoxError from '../../../../components/ui/BoxError';
import { getUsers } from '../../../../api/users';

function SearchUsernameSiswa({ SetUserID }) {
  const [username, setUsername] = useState('');
  const [resultSearchUsernameSiswa, setResultSearchUsernameSiswa] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSearchUsernameSiswa(username) {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await getUsers('siswa', username, 1, 10);
      const data = response.data.data;
      console.log(data.users);
      setResultSearchUsernameSiswa(data.users);
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
    if (username.length >= 4) {
      setIsLoading(true);
      const timeOut = setTimeout(() => {
        handleSearchUsernameSiswa(username);
      }, 250);
      return () => {
        clearTimeout(timeOut);
        setIsLoading(false);
      };
    }
    return () => {
      setResultSearchUsernameSiswa([]);
    };
  }, [username]);

  function addUsernameSiswa({ id, username }) {
    setUsername(username);
    SetUserID(id);
    setResultSearchUsernameSiswa([]);
  }

  return (
    <div className="w-full relative">
      <InputField
        HtmlFor="username"
        Type="text"
        Value={username}
        Placeholder="username"
        Required={false}
        OnChange={(e) => {
          setUsername(e.target.value);
        }}
      >
        Username
        <InputRequired />
      </InputField>
      <div className="absolute z-50 w-full overflow-auto max-h-40 md:w-4/6 bg-white dark:bg-gray-500 rounded-b-md">
        {isLoading && <p className=" px-4 py-2.5">Loading...</p>}
        {isError && <BoxError>{errorMessage}</BoxError>}
        {resultSearchUsernameSiswa?.length > 0 && (
          <ul className=" px-4 py-2.5">
            {resultSearchUsernameSiswa?.map((item) => {
              if (item.siswa.length === 0)
                return (
                  <li
                    key={item.id}
                    className="p-2 rounded-md hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400"
                    onClick={() => addUsernameSiswa(item)}
                  >
                    <h3 className="text-sm font-semibold">
                      Username: {item.username}
                    </h3>
                    <p className="text-xs font-thin">Role: {item.role}</p>
                    <hr />
                  </li>
                );
              return (
                <li
                  key={item.id}
                  className="p-2 rounded-md hover:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-400"
                >
                  <h3 className="text-sm font-semibold">
                    Username: {item.username}{' '}
                    <span className="text-red-500">(sudah digunakan)</span>
                  </h3>
                  <p className="text-xs font-thin">Role: {item.role}</p>
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

SearchUsernameSiswa.propTypes = {
  SetUserID: PropTypes.func.isRequired,
};

export default SearchUsernameSiswa;
