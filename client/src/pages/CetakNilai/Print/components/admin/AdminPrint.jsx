import { Navigate, useLocation } from 'react-router-dom';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import ComponentToPrint from './ComponentToPrint';
import { useEffect, useRef, useState } from 'react';
import { getSiswa } from '../../../../../api/siswa';
import BoxError from '../../../../../components/ui/BoxError';
import ComponentPrint from './ComponentPrint';

function AdminPrint() {
  const { state } = useLocation();
  const [dataDocument, setDataDocument] = useState(null);
  const [dataSiswa, setDataSiswa] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(true);

  async function fetchSiswa() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getSiswa(state?.data?.siswa_id);
      const data = response?.data?.data;
      setDataSiswa(data);
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
    if (state && isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchSiswa();
    }

    return () => {
      isComponentMounted.current = false;
    };
  }, [state]);

  useEffect(() => {
    if (state && dataSiswa) {
      const documentTitle = `${state?.data?.siswa_id}-${state?.data?.semester_id}`;
      setDataDocument({
        documentTitle: documentTitle,
        prevLocation: state?.data?.prevLocation,
        data: {
          siswa: {
            siswa_id: state?.data?.siswa_id,
            siswa_nama: dataSiswa?.nama,
            siswa_nis: dataSiswa?.nis,
            siswa_nisn: dataSiswa?.nisn,
            semester_id: state?.data?.semester_id,
            kelas_id: state?.data?.kelas_id,
          },
          nilai: state?.data?.nilai,
        },
      });
    }
  }, [state, dataSiswa]);

  if (!state) return <Navigate to={'/cetak-nilai'} replace={true} />;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      {!isLoading &&
        !isError &&
        dataDocument &&
        dataSiswa &&
        state &&
        state?.success && (
          <>
            <Header>Cetak Nilai {state?.data?.siswa_id}</Header>
            <Container>
              <ComponentPrint
                ComponentToPrint={ComponentToPrint}
                DataDocument={dataDocument}
              />
            </Container>
          </>
        )}
    </>
  );
}

export default AdminPrint;
