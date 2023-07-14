import { Navigate, useLocation } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import EditKontakSekolahAdmin from './components/admin/EditKontakSekolahAdmin';

function EditKontakSekolah() {
  useTitle('Kontak Sekolah');
  const { state } = useLocation();
  console.log(state);

  if (!state || state?.role !== 'admin' || !state?.data) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {state?.role === 'admin' && state?.data && (
        <EditKontakSekolahAdmin
          TextHeader={state?.textHeader}
          DataKontakSekolah={state?.data}
        />
      )}
    </>
  );
}

export default EditKontakSekolah;
