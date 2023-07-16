import { Navigate, useLocation } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import AddKontakSekolahAdmin from './components/admin/AddKontakSekolahAdmin';

function AddKontakSekolah() {
  useTitle('Kontak Sekolah');
  const { state } = useLocation();

  if (!state || state?.role !== 'admin') {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {state?.role === 'admin' && (
        <AddKontakSekolahAdmin TextHeader={state?.textHeader} />
      )}
    </>
  );
}

export default AddKontakSekolah;
