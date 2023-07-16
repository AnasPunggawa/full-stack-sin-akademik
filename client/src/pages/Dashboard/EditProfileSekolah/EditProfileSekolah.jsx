import { Navigate, useLocation } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import EditProfileSekolahAdmin from './components/admin/EditProfileSekolahAdmin';

function EditProfileSekolah() {
  useTitle('Profil Sekolah');
  const { state } = useLocation();

  if (!state || state?.role !== 'admin' || !state?.data) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {state?.role === 'admin' && state?.data && (
        <EditProfileSekolahAdmin
          TextHeader={state?.textHeader}
          DataProfilSekolah={state?.data}
        />
      )}
    </>
  );
}

export default EditProfileSekolah;
