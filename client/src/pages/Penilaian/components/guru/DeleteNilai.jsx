import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteNilai } from '../../../../api/nilai';
import Button from '../../../../components/ui/Button';
import { IconWarning, IconXMark } from '../../../../components/ui/Icons';
import BoxError from '../../../../components/ui/BoxError';

function DeleteNilai({ Nilai, SetRefreshCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    if (!isOpen) document.body.style.overflow = 'auto';
    return;
  }, [isOpen]);

  async function handleDelete(id) {
    setIsLoading(true);
    setIsError(false);
    try {
      await deleteNilai(id);
      // const data = await deleteNilai(id);
      // console.log(data);
      setIsOpen(false);
      SetRefreshCount((prev) => prev + 1);
      navigate('/penilaian', {
        state: { success: true, message: 'Berhasil menghapus nilai' },
        replace: true,
      });
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

  return (
    <>
      <Button OnClick={() => toggleModal()} ButtonStyle="LINK_DANGER">
        Hapus
      </Button>

      {Nilai && (
        <div
          tabIndex="-1"
          className={`${
            isOpen ? 'block' : 'hidden'
          } fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full`}
        >
          <div className="relative flex bg-gray-900/25 dark:bg-white/25 items-center justify-center w-full h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={toggleModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <IconXMark />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center space-y-5">
                <IconWarning />
                {isLoading && <p>Loading...</p>}
                {isError && <BoxError>{errorMessage}</BoxError>}
                <h3 className="text-sm md:text-lg font-normal text-gray-500 dark:text-gray-400">
                  Apakah anda yakin menghapus nilai{' '}
                  <span className="text-gray-900 dark:text-white">
                    {Nilai?.siswa?.nama}
                  </span>{' '}
                  ?
                </h3>
                <div className="flex gap-2 items-center justify-center">
                  <Button
                    OnClick={() => handleDelete(Nilai.id)}
                    ButtonStyle="DANGER"
                    Disabled={isLoading || isError}
                  >
                    Iya
                  </Button>
                  <Button OnClick={() => toggleModal()} ButtonStyle="SECONDARY">
                    Batal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

DeleteNilai.propTypes = {
  Nilai: PropTypes.object,
  SetRefreshCount: PropTypes.func,
};

export default DeleteNilai;
