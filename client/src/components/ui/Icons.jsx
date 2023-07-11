import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTableColumns,
  faUser,
  faUsers,
  faChalkboardUser,
  faGraduationCap,
  faBook,
  faPersonChalkboard,
  faCalendarCheck,
  faPrint,
  faListUl,
  faXmark,
  faStar,
  faMagnifyingGlass,
  faChevronDown,
  faChevronUp,
  faPlus,
  faChevronLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

export function IconMenu() {
  return (
    <FontAwesomeIcon
      icon={faListUl}
      className="w-5 h-5 text-gray-900  dark:text-white transition duration-75"
    />
  );
}

export function IconXMark() {
  return (
    <FontAwesomeIcon
      icon={faXmark}
      className="w-5 h-5 text-gray-900  dark:text-white transition duration-75"
    />
  );
}

export function IconDashboard() {
  return <FontAwesomeIcon icon={faTableColumns} className="w-5 h-5" />;
}

export function IconUser() {
  return <FontAwesomeIcon icon={faUser} className="w-5 h-5" />;
}

export function IconUsers() {
  return <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />;
}

export function IconGuru() {
  return <FontAwesomeIcon icon={faPersonChalkboard} className="w-5 h-5" />;
}

export function IconSiswa() {
  return <FontAwesomeIcon icon={faGraduationCap} className="w-5 h-5" />;
}

export function IconMapel() {
  return <FontAwesomeIcon icon={faBook} className="w-5" />;
}

export function IconKelas() {
  return <FontAwesomeIcon icon={faChalkboardUser} className="w-5 h-5" />;
}

export function IconSemester() {
  return <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5" />;
}

export function IconNilai() {
  return <FontAwesomeIcon icon={faStar} className="w-5 h-5" />;
}

export function IconCetak() {
  return <FontAwesomeIcon icon={faPrint} className="w-5 h-5" />;
}

export function IconSeacrh() {
  return <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />;
}

export function IconChevronDown() {
  return <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />;
}

export function IconChevronUp() {
  return <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" />;
}

export function IconChevronLeft() {
  return <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />;
}

export function IconPlus() {
  return <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />;
}

export function IconEye() {
  return <FontAwesomeIcon icon={faEye} className="w-4 h-4" />;
}

export function IconEyeSlash() {
  return <FontAwesomeIcon icon={faEyeSlash} className="w-4 h-4" />;
}

export function IconPrint() {
  return <FontAwesomeIcon icon={faPrint} className="w-4 h-4" />;
}

export function IconWarning() {
  return (
    <svg
      aria-hidden="true"
      className="mx-auto mb-4 text-red-600 w-14 h-14 dark:text-red-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );
}
