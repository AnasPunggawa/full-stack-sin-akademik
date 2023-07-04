import {
  IconCetak,
  IconDashboard,
  IconGuru,
  IconKelas,
  IconMapel,
  IconSemester,
  IconSiswa,
  IconUser,
  IconUsers,
} from '../ui/Icons';
import ListLink from '../ui/ListLink';

const adminNavigation = [
  {
    name: 'Dashboard',
    icon: <IconDashboard />,
    link: '/',
  },
  {
    name: 'My Profile',
    icon: <IconUser />,
    link: '/profile',
  },
  {
    name: 'Users',
    icon: <IconUsers />,
    link: '/users',
  },
  {
    name: 'Guru',
    icon: <IconGuru />,
    link: '/guru',
  },
  {
    name: 'Siswa',
    icon: <IconSiswa />,
    link: '/siswa',
  },
  {
    name: 'Mata Pelajaran',
    icon: <IconMapel />,
    link: '/mata-pelajaran',
  },
  {
    name: 'Kelas',
    icon: <IconKelas />,
    link: '/kelas',
  },
  {
    name: 'Semester',
    icon: <IconSemester />,
    link: '/semester',
  },
  {
    name: 'Cetak Nilai',
    icon: <IconCetak />,
    link: '/cetak-nilai',
  },
];

function AdminNavigation() {
  return (
    <ul className="space-y-2 font-medium">
      {adminNavigation.map((item, i) => (
        <ListLink
          key={i}
          ItemLink={item.link}
          ItemIcon={item.icon}
          ItemName={item.name}
        />
      ))}
    </ul>
  );
}

export default AdminNavigation;
