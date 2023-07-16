import { Navigate, useLocation } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import AddIdentitasSekolahAdmin from './components/admin/AddIdentitasSekolahAdmin';

function AddIdentitasSekolah() {
  useTitle('Identitas Sekolah');
  const { state } = useLocation();

  if (!state || state?.role !== 'admin') {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {state?.role === 'admin' && (
        <AddIdentitasSekolahAdmin TextHeader={state?.textHeader} />
      )}
    </>
  );
}

export default AddIdentitasSekolah;
