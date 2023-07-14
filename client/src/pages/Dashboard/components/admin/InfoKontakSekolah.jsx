import { useEffect, useRef, useState } from 'react';
import { getKontakSekolah } from '../../../../api/dashboard';
import BoxError from '../../../../components/ui/BoxError';
import Button from '../../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../../utils/capitalizeFirstLetter';

function InfoKontakSekolah() {
  const [dataKontakSekolah, setDataKontakSekolah] = useState(null);
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
    return navigate('/dashboard/add-kontak-sekolah', {
      state: {
        role: 'admin',
        textHeader: 'Tambah Kontak Sekolah',
      },
    });
  }

  function handleEdit() {
    return navigate('/dashboard/edit-kontak-sekolah', {
      state: {
        role: 'admin',
        textHeader: 'Edit Kontak Sekolah',
        data: dataKontakSekolah,
      },
    });
  }

  return (
    <div className="rounded-md bg-white dark:bg-gray-700">
      <div className="w-full flex justify-between items-center p-3 bg-green-500 dark:bg-green-600 rounded-t-md">
        <h3 className="font-semibold text-base text-white">Kontak Sekolah</h3>
        {isError && !dataKontakSekolah ? (
          <Button OnClick={handleTambah} ButtonStyle="LINK_WHITE">
            Tambah
          </Button>
        ) : (
          <Button OnClick={handleEdit} ButtonStyle="LINK_WHITE">
            Edit
          </Button>
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
                  {dataKontakSekolah?.alamat
                    ? capitalizeFirstLetter(dataKontakSekolah?.alamat)
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>RT / RW</td>
                <td>:</td>
                {/* <td>0 / 0</td> */}
                <td>
                  {dataKontakSekolah?.rt ? dataKontakSekolah?.rt : '-'} /{' '}
                  {dataKontakSekolah?.rw ? dataKontakSekolah?.rw : '-'}
                </td>
              </tr>
              <tr>
                <td>Dusun</td>
                <td>:</td>
                {/* <td>Bontosunggu</td> */}
                <td>
                  {dataKontakSekolah?.dusun
                    ? capitalizeFirstLetter(dataKontakSekolah?.dusun)
                    : '-'}
                </td>
              </tr>
              <tr>
                <td width="50%">Desa atau Kelurahan</td>
                <td>:</td>
                {/* <td>Empoang</td> */}
                <td>
                  {dataKontakSekolah?.desa_kelurahan
                    ? capitalizeFirstLetter(dataKontakSekolah?.desa_kelurahan)
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Kecamatan</td>
                <td>:</td>
                {/* <td>Binamu</td> */}
                <td>
                  {dataKontakSekolah?.kecamatan
                    ? capitalizeFirstLetter(dataKontakSekolah?.kecamatan)
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Kabupaten</td>
                <td>:</td>
                {/* <td>Jeneponto</td> */}
                <td>
                  {dataKontakSekolah?.kabupaten
                    ? capitalizeFirstLetter(dataKontakSekolah?.kabupaten)
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Provinsi</td>
                <td>:</td>
                {/* <td>Sulawesi Selatan</td> */}
                <td>
                  {dataKontakSekolah?.provinsi
                    ? capitalizeFirstLetter(dataKontakSekolah?.provinsi)
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Kode Pos</td>
                <td>:</td>
                {/* <td>92311</td> */}
                <td>
                  {dataKontakSekolah?.kode_pos
                    ? dataKontakSekolah?.kode_pos
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Nomor Telepon</td>
                <td>:</td>
                {/* <td>-5</td> */}
                <td>
                  {dataKontakSekolah?.nomor_telepon
                    ? dataKontakSekolah?.nomor_telepon
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                {/* <td>119</td> */}
                <td>
                  {dataKontakSekolah?.email ? dataKontakSekolah?.email : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default InfoKontakSekolah;
