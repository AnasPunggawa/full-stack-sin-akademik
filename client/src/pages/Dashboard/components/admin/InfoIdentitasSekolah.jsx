import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIndetitasSekolah } from '../../../../api/dashboard';
import BoxError from '../../../../components/ui/BoxError';
import Button from '../../../../components/ui/Button';
import { capitalizeFirstLetter } from '../../../../utils/capitalizeFirstLetter';

function InfoIdentitasSekolah() {
  const [dataIdentitaskSekolah, setDataIdentitasSekolah] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();

  async function fetchIdentitaskSekolah() {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const response = await getIndetitasSekolah();
      const data = response?.data?.data;
      setDataIdentitasSekolah(data);
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
      fetchIdentitaskSekolah();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  function handleTambah() {
    return navigate('/dashboard/add-identitas-sekolah', {
      state: {
        role: 'admin',
        textHeader: 'Tambah Identitas Sekolah',
      },
    });
  }

  function handleEdit() {
    return navigate('/dashboard/edit-identitas-sekolah', {
      state: {
        role: 'admin',
        textHeader: 'Edit Identitas Sekolah',
        data: dataIdentitaskSekolah,
      },
    });
  }

  return (
    <div className="rounded-md bg-white dark:bg-gray-700">
      <div className="w-full flex justify-between items-center p-3 bg-yellow-500 dark:bg-yellow-600 rounded-t-md">
        <h3 className="font-semibold text-base text-white">
          Identitas Sekolah
        </h3>
        {isError && !dataIdentitaskSekolah ? (
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
        {!isLoading && !isError && dataIdentitaskSekolah && (
          <table className="w-full p-3">
            <tbody>
              <tr>
                <td>NPSN</td>
                <td>:</td>
                <td>
                  {dataIdentitaskSekolah?.npsn
                    ? dataIdentitaskSekolah?.npsn
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>:</td>
                {/* <td>{dataIdentitaskSekolah?.status}</td> */}
                <td>
                  {dataIdentitaskSekolah?.status
                    ? capitalizeFirstLetter(dataIdentitaskSekolah?.status)
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Bentuk Pendidikan</td>
                <td>:</td>
                <td>
                  {dataIdentitaskSekolah?.bentuk_pendidikan
                    ? dataIdentitaskSekolah?.bentuk_pendidikan
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Status Kepemilikan</td>
                <td>:</td>
                {/* <td>{dataIdentitaskSekolah?.status_kepemilikan}</td> */}
                <td>
                  {dataIdentitaskSekolah?.status_kepemilikan
                    ? capitalizeFirstLetter(
                        dataIdentitaskSekolah?.status_kepemilikan
                      )
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>SK Pendirian Sekolah</td>
                <td>:</td>
                <td>
                  {dataIdentitaskSekolah?.sk_pendirian_sekolah
                    ? dataIdentitaskSekolah?.sk_pendirian_sekolah
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>Tanggal SK Pendirian</td>
                <td>:</td>
                <td>
                  {dataIdentitaskSekolah?.tanggal_sk_pendirian
                    ? dataIdentitaskSekolah?.tanggal_sk_pendirian
                    : '-'}
                </td>
              </tr>
              <tr>
                <td>SK Izin Operasional</td>
                <td>:</td>
                <td>
                  {dataIdentitaskSekolah?.sk_izin_operasional
                    ? dataIdentitaskSekolah?.sk_izin_operasional
                    : '-'}
                </td>
              </tr>
              <tr>
                <td width="50%">Tanggal SK Izin Operasional</td>
                <td>:</td>
                <td>
                  {dataIdentitaskSekolah?.tanggal_sk_izin_operasional
                    ? dataIdentitaskSekolah?.tanggal_sk_izin_operasional
                    : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default InfoIdentitasSekolah;
