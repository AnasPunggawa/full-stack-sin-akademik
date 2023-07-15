import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import ComponentPrint from './ComponentPrint';
import ComponentToPrint from './ComponentToPrint';

function SiswaPrint() {
  const { state } = useLocation();
  const [dataDocument, setDataDocument] = useState(null);

  useEffect(() => {
    if (state && state?.success) {
      const documentTitle = `${state?.data?.siswaInfo?.siswa_id}-${state?.data?.semester_id}-${state?.data?.kelas_id}`;
      setDataDocument({
        documentTitle: documentTitle,
        prevLocation: state?.data?.prevLocation,
        data: {
          siswa: {
            ...state?.data.siswaInfo,
            semester_id: state?.data?.semester_id,
            kelas_id: state?.data?.kelas_id,
          },
          nilai: state?.data?.nilai,
        },
      });
    }
  }, [state]);

  if (!state) return <Navigate to={'/cetak-nilai'} replace={true} />;

  return (
    <>
      {dataDocument && state && state?.success && (
        <>
          <Header>Cetak Nilai {state?.data?.siswaInfo?.siswa_id}</Header>
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

export default SiswaPrint;
