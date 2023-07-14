import { useEffect, useRef, useState } from 'react';
import LogoSekolah from '../../../../assets/images/logo-smpn1-binamu.webp';
import { useNavigate } from 'react-router-dom';
import { getProfilSekolah } from '../../../../api/dashboard';
import BoxError from '../../../../components/ui/BoxError';
import Button from '../../../../components/ui/Button';
function InfoProfileSekolah() {
  // const [dataProfilkSekolah, setDataProfilSekolah] = useState({});
  const [dataProfilkSekolah, setDataProfilSekolah] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();

  async function fetchProfilkSekolah() {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const response = await getProfilSekolah();
      const data = response?.data?.data;
      setDataProfilSekolah(data);
    } catch (error) {
      setIsError(true);
      if (error.response.data.status === 500)
        return setErrorMessage('Something went wrong');
      if (error.response) return setErrorMessage(error.response.data.message);
      return setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchProfilkSekolah();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  function handleTambah() {
    return navigate('/dashboard/add-profil-sekolah', {
      state: {
        role: 'admin',
        textHeader: 'Tambah Profil Sekolah',
      },
    });
  }

  return (
    <div className="rounded-md bg-white dark:bg-gray-700">
      <div className="w-full flex justify-between items-center p-3 bg-red-500 dark:bg-red-600 rounded-t-md">
        <h3 className="font-semibold text-base text-white">Profil Sekolah</h3>
        {/* {isError && Object.keys(dataProfilkSekolah).length === 0 ? ( */}
        {isError && !dataProfilkSekolah ? (
          <Button OnClick={handleTambah} ButtonStyle="LINK_WHITE">
            Tambah
          </Button>
        ) : (
          <Button ButtonStyle="LINK_WHITE">Edit</Button>
        )}
      </div>
      <div className="p-3 space-y-2">
        {isLoading && <p>Loading...</p>}
        {isError && <BoxError>{errorMessage}</BoxError>}
        {!isLoading && !isError && dataProfilkSekolah && (
          <>
            <img
              src={LogoSekolah}
              className="h-24 mx-auto"
              alt="Logo UPT SMP Negeri 1 Binamu"
            />
            <h4 className="text-center font-semibold">
              {dataProfilkSekolah?.nama_sekolah
                ? dataProfilkSekolah?.nama_sekolah?.toUpperCase()
                : 'SEKOLAH'}
            </h4>
            <table className="w-full">
              <tbody>
                <tr>
                  <td width="50%">Kepala Sekolah</td>
                  <td>:</td>
                  <td>
                    {dataProfilkSekolah?.nama_kepala_sekolah
                      ? dataProfilkSekolah?.nama_kepala_sekolah
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td>Operator</td>
                  <td>:</td>
                  <td>
                    {dataProfilkSekolah?.nama_operator
                      ? dataProfilkSekolah?.nama_operator
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td>Akreditasi</td>
                  <td>:</td>
                  <td>
                    {dataProfilkSekolah?.akreditasi
                      ? dataProfilkSekolah?.akreditasi?.toUpperCase()
                      : '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoProfileSekolah;
