import PropTypes from 'prop-types';
import {
  IconKelas,
  IconMapel,
  IconServer,
  IconUser,
  IconUsers,
} from '../../../../components/ui/Icons';
import DashboardCardInfo from './DashboardCardInfo';

const cardsContent = [
  {
    bgColor: 'bg-blue-500 dark:bg-blue-600',
    title: 'Jumlah Guru Aktif',
    value: '100 Orang',
    Icon: <IconUser />,
  },
  {
    bgColor: 'bg-red-500 dark:bg-red-600',
    title: 'Jumlah Siswa Aktif',
    value: '100 Orang',
    Icon: <IconUsers />,
  },
  {
    bgColor: 'bg-yellow-500 dark:bg-yellow-600',
    title: 'Jumlah Kelas',
    value: '100 Orang',
    Icon: <IconKelas />,
  },
  {
    bgColor: 'bg-green-500 dark:bg-green-600',
    title: 'Jumlah Mata Pelajaran',
    value: '100 Orang',
    Icon: <IconMapel />,
  },
];

function DashboardCardsInfo({ ClassName }) {
  return (
    <>
      <div className="w-full p-3 bg-blue-500 dark:bg-blue-600 rounded-md">
        <h3 className="text-white font-semibold text-base">
          <IconServer /> Sistem Informasi Nilai Akademik
        </h3>
      </div>
      <div className={ClassName}>
        {cardsContent.map((cardContent, index) => {
          return <DashboardCardInfo CardContent={cardContent} key={index} />;
        })}
      </div>
    </>
  );
}

DashboardCardsInfo.propTypes = {
  ClassName: PropTypes.string,
};

export default DashboardCardsInfo;
