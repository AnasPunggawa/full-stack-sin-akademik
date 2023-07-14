import { IconInfo } from '../../../../components/ui/Icons';
import InfoIdentitasSekolah from './InfoIdentitasSekolah';
import InfoKontakSekolah from './InfoKontakSekolah';
import InfoProfileSekolah from './InfoProfileSekolah';

function DashboardInfoSekolah() {
  return (
    <>
      <div className="w-full py-1.5 px-3 bg-blue-500 dark:bg-blue-600 rounded-md">
        <h3 className="text-white font-semibold text-base">
          <IconInfo /> Informasi Sekolah
        </h3>
      </div>
      <div className="w-full grid md:grid-cols-3 gap-3">
        <div className="md:col-span-1">
          <InfoProfileSekolah />
        </div>
        <div className="md:col-span-2 space-y-3">
          <InfoIdentitasSekolah />
          <InfoKontakSekolah />
        </div>
      </div>
    </>
  );
}

export default DashboardInfoSekolah;
