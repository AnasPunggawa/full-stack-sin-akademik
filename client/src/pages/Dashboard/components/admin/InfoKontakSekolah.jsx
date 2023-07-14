import { useEffect, useRef, useState } from 'react';
import { getKontakSekolah } from '../../../../api/dashboard';
import BoxError from '../../../../components/ui/BoxError';
import Button from '../../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

function InfoKontakSekolah() {
  const [dataKontakSekolah, setDataKontakSekolah] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();

  async function fetchKontakSekolah() {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const response = await getKontakSekolah();
      const data = response?.data?.data;
      console.log(data);
      setDataKontakSekolah(data);
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
      fetchKontakSekolah();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  function handleTambah() {
    return navigate('/dashboard/add-kontak-sekolah');
  }

  return (
    <div className="rounded-md bg-white dark:bg-gray-700">
      <div className="w-full flex justify-between items-center p-3 bg-green-500 dark:bg-green-600 rounded-t-md">
        <h3 className="font-semibold text-base text-white">Kontak Sekolah</h3>
        {isError ? (
          <Button OnClick={handleTambah} ButtonStyle="LINK_WHITE">
            Tambah
          </Button>
        ) : (
          <Button ButtonStyle="LINK_WHITE">Edit</Button>
        )}
      </div>
      <div className="w-full p-3">
        {isLoading && <p>Loading...</p>}
        {isError && <BoxError>{errorMessage}</BoxError>}
        {!isLoading && !isError && dataKontakSekolah && (
          <table className="w-full p-3">
            <tbody>
              <tr>
                <td>Alamat</td>
                <td>:</td>
                {/* <td>Jl. Lanto Daeng Pasewang No. 32 Bontosunggu</td> */}
                <td>
                  {dataKontakSekolah?.alamat ? dataKontakSekolah?.alamat : '-'}
                </td>
              </tr>
              <tr>
                <td>RT / RW</td>
                <td>:</td>
                {/* <td>0 / 0</td> */}
                <td>
                  {dataKontakSekolah?.rt} / {dataKontakSekolah?.rt}
                </td>
              </tr>
              <tr>
                <td>Dusun</td>
                <td>:</td>
                {/* <td>Bontosunggu</td> */}
                <td>{dataKontakSekolah?.dusun}</td>
              </tr>
              <tr>
                <td>Desa / Kelurahan</td>
                <td>:</td>
                {/* <td>Empoang</td> */}
                <td>{dataKontakSekolah?.desa_kelurahan}</td>
              </tr>
              <tr>
                <td>Kecamatan</td>
                <td>:</td>
                {/* <td>Binamu</td> */}
                <td>{dataKontakSekolah?.kecamatan}</td>
              </tr>
              <tr>
                <td>Kabupaten</td>
                <td>:</td>
                {/* <td>Jeneponto</td> */}
                <td>{dataKontakSekolah?.kabupaten}</td>
              </tr>
              <tr>
                <td>Provinsi</td>
                <td>:</td>
                {/* <td>Sulawesi Selatan</td> */}
                <td>{dataKontakSekolah?.provinsi}</td>
              </tr>
              <tr>
                <td>Kode Pos</td>
                <td>:</td>
                {/* <td>92311</td> */}
                <td>{dataKontakSekolah?.kode_pos}</td>
              </tr>
              <tr>
                <td>Nomor Telepon</td>
                <td>:</td>
                {/* <td>-5</td> */}
                <td>{dataKontakSekolah?.nomor_telepon}</td>
              </tr>
              <tr>
                <td>email</td>
                <td>:</td>
                {/* <td>119</td> */}
                <td>{dataKontakSekolah?.email}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default InfoKontakSekolah;
