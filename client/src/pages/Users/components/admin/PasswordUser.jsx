import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconWarning, IconXMark } from '../../../../components/ui/Icons';
import Button from '../../../../components/ui/Button';

function PasswordUser({ User }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    if (!isOpen) document.body.style.overflow = 'auto';
    return;
  }, [isOpen]);

  return (
    <>
      <Button OnClick={() => toggleModal()} ButtonStyle="LINK_PRIMARY">
        Password
      </Button>

      <div
        tabIndex="-1"
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full`}
      >
        <div className="relative flex bg-gray-900/25 dark:bg-white/25 items-center justify-center w-full h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 min-w-fit">
            <button
              onClick={toggleModal}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <IconXMark />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <IconWarning />
              <h2 className="mb-5 text-base md:text-lg  font-normal text-gray-500 dark:text-gray-400">
                GUNAKANLAH DENGAN BIJAK
              </h2>
              <h3 className="mb-5 text-sm md:text-base font-normal text-gray-500 dark:text-gray-400">
                Username:{' '}
                <span className="text-gray-900 dark:text-white">
                  {User.username}
                </span>
                <br />
                Password:{' '}
                <span className="text-gray-900 dark:text-white">
                  {User.password}
                </span>{' '}
              </h3>
              <Button OnClick={() => toggleModal()} ButtonStyle="SECONDARY">
                Tutup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PasswordUser.propTypes = {
  User: PropTypes.object,
};

export default PasswordUser;
