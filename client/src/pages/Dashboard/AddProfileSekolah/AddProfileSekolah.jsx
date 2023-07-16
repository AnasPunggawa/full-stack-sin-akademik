import { useTitle } from '../../../hooks/useTitle';
import { Navigate, useLocation } from 'react-router-dom';
import AddProfileSekolahAdmin from './components/admin/AddProfileSekolahAdmin';

function AddProfileSekolah() {
  useTitle('Profil Sekolah');
  const { state } = useLocation();

  if (!state || state?.role !== 'admin') {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {state?.role === 'admin' && (
        <AddProfileSekolahAdmin TextHeader={state?.textHeader} />
      )}
    </>
  );
}

export default AddProfileSekolah;
