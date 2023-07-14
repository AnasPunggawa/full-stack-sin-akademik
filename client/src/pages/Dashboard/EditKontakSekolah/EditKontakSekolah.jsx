import { Navigate, useLocation } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';

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
        <>
          <h1>{state?.textHeader}</h1>
          {/* <AddKontakSekolahAdmin TextHeader={state?.textHeader} /> */}
        </>
      )}
    </>
  );
}

export default EditKontakSekolah;
