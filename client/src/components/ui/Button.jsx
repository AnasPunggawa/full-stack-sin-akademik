import PropTypes from 'prop-types';

function Button({
  children = 'button',
  Type = 'button',
  ClassName = '',
  OnClick = () => {},
  Disabled = false,
  ButtonStyle = 'PRIMARY',
}) {
  const BUTTON_STYLE = {
    PRIMARY: `${ClassName} ${
      Disabled
        ? 'cursor-default text-gray-200 bg-primary-400 dark:bg-primary-400'
        : ' text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700  focus:ring-4 focus:ring-primary-300 focus:outline-none dark:focus:ring-primary-800'
    } text-sm md:text-base font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 px-3 py-2 text-center`,
    SECONDARY:
      'text-sm md:text-base font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm sm:px-5 sm:py-2.5 px-3 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500',
    DANGER:
      'text-sm md:text-base font-medium text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg text-sm inline-flex items-center sm:px-5 sm:py-2.5 px-3 py-2 text-center',
    DROPDOWN:
      'text-sm md:text-base font-medium text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
    NO_STYLE: '',
    LINK_PRIMARY:
      'text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline',
    LINK_SECONDARY:
      'text-sm font-medium text-gray-900 dark:text-white hover:underline',
    LINK_DANGER:
      'text-sm font-medium text-red-600 dark:text-red-500 hover:underline',
    LINK_NO_STYLE: '',
  };

  return (
    <>
      <button
        type={Type}
        className={BUTTON_STYLE[ButtonStyle]}
        onClick={OnClick}
        disabled={Disabled}
      >
        {children}
      </button>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  Type: PropTypes.string,
  ClassName: PropTypes.string,
  OnClick: PropTypes.func,
  Disabled: PropTypes.bool,
  ButtonStyle: PropTypes.string,
};

export default Button;
