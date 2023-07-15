import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import PageBodyInfo from './PageBodyInfo';
import PageBodyNilai from './PageBodyNilai';
import '../page-print.style.css';
import {
  getKontakSekolah,
  getProfilSekolah,
} from '../../../../../api/dashboard';
import BoxError from '../../../../../components/ui/BoxError';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';

const ComponentToPrint = forwardRef(function ComponentToPrint({ Data }, ref) {
  const { guru, nilai } = Data;

  const [dataSekolah, setDataSekolah] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(true);

  async function fetchDataUser() {
    setIsLoading(true);
    setIsError(false);
    try {
      const responseProfil = await getProfilSekolah();
      const responseKontak = await getKontakSekolah();
      const dataProfil = responseProfil?.data?.data;
      const dataKontak = responseKontak?.data?.data;
      const data = {
        dataProfil,
        dataKontak,
      };
      setDataSekolah(data);
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
      fetchDataUser();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  return (
    <div className="flex justify-start min-[900px]:justify-center overflow-x-auto">
      <div
        ref={ref}
        className="bg-white text-black font-sans page-print py-8 px-12 min-w-[21cm] min-h-[29.7cm] rounded-md page-body"
      >
        {isLoading && <p>Loading...</p>}
        {isError && <BoxError>{errorMessage}</BoxError>}
        {!isLoading && !isError && dataSekolah && (
          <>
            <PageHeader PageTitle="LAPORAN NILAI" DataSekolah={dataSekolah} />
            <PageBodyInfo Info={guru} />
            <PageBodyNilai Nilai={nilai} />
            <PageFooter DataSekolah={dataSekolah} />
          </>
        )}
      </div>
    </div>
  );
});

ComponentToPrint.propTypes = {
  Text: PropTypes.string,
  Data: PropTypes.object,
};

export default ComponentToPrint;
