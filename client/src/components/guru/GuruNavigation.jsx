import {
  IconCetak,
  IconDashboard,
  IconNilai,
  IconSiswa,
  IconUser,
} from '../ui/Icons';
import ListLink from '../ui/ListLink';

const guruNavigation = [
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
    name: 'Penilaian',
    icon: <IconNilai />,
    link: '/penilaian',
  },
  {
    name: 'Siswa',
    icon: <IconSiswa />,
    link: '/siswa',
  },
  {
    name: 'Cetak Nilai',
    icon: <IconCetak />,
    link: '/cetak-nilai',
  },
];

function GuruNavigation() {
  return (
    <ul className="space-y-2 font-medium">
      {guruNavigation.map((item, i) => (
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

export default GuruNavigation;
