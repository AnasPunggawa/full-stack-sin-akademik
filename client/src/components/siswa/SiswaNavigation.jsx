import { IconCetak, IconDashboard, IconUser } from '../ui/Icons';
import ListLink from '../ui/ListLink';

const siswaNavigation = [
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
    name: 'Cetak Nilai',
    icon: <IconCetak />,
    link: '/cetak-nilai',
  },
];

function SiswaNavigation() {
  return (
    <ul className="space-y-2 font-medium">
      {siswaNavigation.map((item, i) => (
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

export default SiswaNavigation;
