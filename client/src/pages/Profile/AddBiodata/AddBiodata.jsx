import { Navigate, useLocation } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import AddBiodataAdmin from './components/admin/AddBiodataAdmin';
import AddBiodataGuru from './components/guru/AddBiodataGuru';
import AddBiodataSiswa from './components/siswa/AddBiodataSiswa';

function AddBiodata() {
  useTitle('Tambah Biodata');
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/profile" replace={true} />;
  }

  return (
    <>
      {state?.role === 'admin' && <AddBiodataAdmin User={state} />}
      {state?.role === 'guru' && <AddBiodataGuru User={state} />}
      {state?.role === 'siswa' && <AddBiodataSiswa User={state} />}
    </>
  );
}

export default AddBiodata;
