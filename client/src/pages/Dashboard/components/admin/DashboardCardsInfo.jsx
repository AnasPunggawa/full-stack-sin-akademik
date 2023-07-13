import PropTypes from 'prop-types';
import {
  IconKelas,
  IconMapel,
  IconServer,
  IconUser,
  IconUsers,
} from '../../../../components/ui/Icons';
import DashboardCardInfo from './DashboardCardInfo';

function DashboardCardsInfo({ ClassName, CardsCountValue }) {
  const cardsContent = [
    {
      bgColor: 'bg-blue-500 dark:bg-blue-600',
      title: 'Jumlah Guru Aktif',
      value: `${CardsCountValue?.count_guru_aktif} Orang`,
      Icon: <IconUser />,
    },
    {
      bgColor: 'bg-red-500 dark:bg-red-600',
      title: 'Jumlah Siswa Aktif',
      value: `${CardsCountValue?.count_siswa_aktif} Orang`,
      Icon: <IconUsers />,
    },
    {
      bgColor: 'bg-yellow-500 dark:bg-yellow-600',
      title: 'Jumlah Kelas',
      value: `${CardsCountValue?.count_kelas} Kelas`,
      Icon: <IconKelas />,
    },
    {
      bgColor: 'bg-green-500 dark:bg-green-600',
      title: 'Jumlah Mata Pelajaran',
      value: `${CardsCountValue?.count_matapelajaran} Mata Pelajaran`,
      Icon: <IconMapel />,
    },
  ];
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
  CardsCountValue: PropTypes.object,
};

export default DashboardCardsInfo;
