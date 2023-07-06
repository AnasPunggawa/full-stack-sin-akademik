import { Navigate, useLocation } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import AddBiodataAdmin from './components/admin/AddBiodataAdmin';

function AddBiodata() {
  useTitle('Tambah Biodata');
  const { state } = useLocation();
  console.log(state?.admin[0]);

  return (
    <>
      {state?.role === 'admin' && !state?.admin[0] ? (
        <AddBiodataAdmin User={state} />
      ) : (
        <Navigate to="/profile" />
      )}
      {/* {state?.role === 'guru' && <AddBiodataGuru User={state} />} */}
      {/* {state?.role === 'siswa' && <AddBiodataSiswa User={state} />} */}
    </>
  );
}

export default AddBiodata;
