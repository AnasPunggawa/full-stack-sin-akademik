import { Navigate, useLocation } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import EditIdentitasSekolahAdmin from './components/admin/EditIdentitasSekolahAdmin';

function EditIdentitasSekolah() {
  useTitle('Identitas Sekolah');
  const { state } = useLocation();
  console.log(state);

  if (!state || state?.role !== 'admin' || !state?.data) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {state?.role === 'admin' && state?.data && (
        <EditIdentitasSekolahAdmin
          TextHeader={state?.textHeader}
          DataIdentitasSekolah={state?.data}
        />
      )}
    </>
  );
}

export default EditIdentitasSekolah;
