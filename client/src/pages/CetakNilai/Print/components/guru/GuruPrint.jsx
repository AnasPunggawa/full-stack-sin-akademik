import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import ComponentPrint from './ComponentPrint';
import ComponentToPrint from './ComponentToPrint';

function GuruPrint() {
  const { state } = useLocation();

  const [dataDocument, setDataDocument] = useState(null);
  const [namaMataPelajaran, setNamaMataPelajaran] = useState('');

  useEffect(() => {
    if (state && state?.success) {
      const namaMapel = generateMataPelajaran(state?.data?.matapelajaran_id);
      setNamaMataPelajaran(namaMapel);
      const documentTitle = `${state?.data?.semester_id}-${state?.data?.kelas_id}-${state?.data?.matapelajaran_id}`;
      setDataDocument({
        documentTitle: documentTitle,
        prevLocation: state?.data?.prevLocation,
        data: {
          guru: {
            ...state?.data?.guruInfo,
            semester_id: state?.data?.semester_id,
            kelas_id: state?.data?.kelas_id,
            matapelajaran_id: state?.data?.matapelajaran_id,
            matapelajaran_nama: namaMapel,
          },
          nilai: state?.data?.nilai,
        },
      });
    }
  }, [state]);

  function generateMataPelajaran(matapelajaran_id) {
    return matapelajaran_id.split('-').slice(1).join(' ').toUpperCase();
  }

  if (!state) return <Navigate to={'/cetak-nilai'} replace={true} />;

  return (
    <>
      {dataDocument && state && state?.success && (
        <>
          <Header>Cetak Nilai Mata Pelajaran {namaMataPelajaran}</Header>
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

export default GuruPrint;
