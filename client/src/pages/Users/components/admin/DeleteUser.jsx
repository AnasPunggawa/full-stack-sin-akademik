import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconWarning, IconXMark } from '../../../../components/ui/Icons';
import Button from '../../../../components/ui/Button';
import { deleteUser } from '../../../../api/users';
import { useNavigate } from 'react-router-dom';
import BoxError from '../../../../components/ui/BoxError';

function DeleteUser({ User, SetRefreshCount }) {
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
    try {
      await deleteUser(id);
      // const data = await deleteUser(id);
      // console.log(data);
      setIsOpen(false);
      SetRefreshCount((prev) => prev + 1);
      navigate('/users', {
        state: { success: true, message: 'Berhasil menghapus user' },
        replace: true,
      });
    } catch (error) {
      setIsError(true);
      if (error.response.data.status === 500 && !error.response.data.success)
        return setErrorMessage('User tidak bisa dihapus');
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

      <div
        tabIndex="-1"
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full`}
        // className={`${
        //   isOpen ? 'block' : 'hidden'
        // } fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        {/* <div className="relative bg-black flex items-center justify-center w-full max-w-md max-h-full"> */}
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
                Apakah anda yakin menghapus user{' '}
                <span className="text-gray-900 dark:text-white">
                  {User.username}
                </span>{' '}
                ?
              </h3>
              <div className="flex gap-2 items-center justify-center">
                <Button
                  OnClick={() => handleDelete(User.id)}
                  ButtonStyle="DANGER"
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
    </>
  );
}

DeleteUser.propTypes = {
  User: PropTypes.object,
  SetRefreshCount: PropTypes.func,
};

export default DeleteUser;
