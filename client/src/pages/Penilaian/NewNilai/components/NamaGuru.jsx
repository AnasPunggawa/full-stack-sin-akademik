import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form/InputField';
import InputRequired from '../../../../components/form/InputRequired';
import jwtDecode from 'jwt-decode';
import BoxError from '../../../../components/ui/BoxError';
import { getUser } from '../../../../api/users';
import { CustomError } from '../../../../utils/CustomError';

function NamaGuru({ SetGuruID }) {
  const getAccessToken = localStorage.getItem('accessToken');
  const decodeAccessToken = jwtDecode(getAccessToken);

  const [dataGuru, setDataGuru] = useState(null);
  const [namaGuru, setNamaGuru] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(true);

  async function fetchUser() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getUser(decodeAccessToken?.id);
      const data = response.data.data;
      if (data.guru.length === 0)
        throw new CustomError(
          404,
          'Data Guru belum lengkap, tolong lengkapi data guru di menu My Profile'
        );
      setDataGuru(data?.guru[0]);
      setNamaGuru(data?.guru[0]?.nama);
      SetGuruID(data?.guru[0]?.id);
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
      fetchUser();
    }

    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      {dataGuru && (
        <InputField
          HtmlFor="nama-guru"
          Placeholder={namaGuru}
          Required={true}
          Disabled={true}
          Value={namaGuru}
          OnChange={() => {}}
        >
          Nama Guru
          <InputRequired />
        </InputField>
      )}
    </>
  );
}

NamaGuru.propTypes = {
  SetGuruID: PropTypes.func,
};

export default NamaGuru;
