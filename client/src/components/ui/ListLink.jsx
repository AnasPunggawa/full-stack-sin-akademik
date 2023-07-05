import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSidebarContext } from '../../hooks/useSidebarContext';
// import useWindowSize from '../../hooks/useWindowSize';

function ListLink({ ItemLink, ItemIcon, ItemName }) {
  // const windowSize = useWindowSize();
  const { toggle } = useSidebarContext();
  function activeLink({ isActive, isPending }) {
    return isActive
      ? 'flex items-center p-2 rounded-lg text-gray-900 dark:text-white bg-gray-300 dark:bg-gray-600'
      : isPending
      ? 'flex items-center p-2 rounded-lg transition duration-7 text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
      : 'flex items-center p-2 rounded-lg transition duration-7 text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200';
  }

  // function handleNavigate() {
  //   if (windowSize.width <= 640) toggle();
  //   return;
  // }

  return (
    <li>
      <NavLink
        // onClick={handleNavigate}
        onClick={() => toggle()}
        to={ItemLink}
        className={activeLink}

        // className={({ isActive, isPending }) =>
        //   isActive
        //     ? 'flex items-center p-2 rounded-lg text-gray-900 dark:text-white bg-gray-300 dark:bg-gray-600'
        //     : isPending
        //     ? 'flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        //     : 'flex items-center p-2 rounded-lg transition duration-7 text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
        // }
      >
        {ItemIcon}
        <span className="ml-3 ">{ItemName}</span>

        {/* <span className="ml-3 text-gray-900 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:bg-gray-700 dark:group-hover:text-white">
          {ItemName}
        </span> */}
      </NavLink>
    </li>
  );
}

ListLink.propTypes = {
  ItemLink: PropTypes.string,
  ItemIcon: PropTypes.element,
  ItemName: PropTypes.string,
};

export default ListLink;
