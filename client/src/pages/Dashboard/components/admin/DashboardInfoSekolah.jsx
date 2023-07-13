import InfoIdentitasSekolah from './InfoIdentitasSekolah';
import InfoKontakSekolah from './InfoKontakSekolah';
import InfoProfileSekolah from './InfoProfileSekolah';

function DashboardInfoSekolah() {
  return (
    <div className="w-full grid md:grid-cols-3 gap-1.5">
      <div className="md:col-span-1">
        <InfoProfileSekolah />
      </div>
      <div className="md:col-span-2 space-y-2">
        <InfoIdentitasSekolah />
        <InfoKontakSekolah />
      </div>
    </div>
  );
}

export default DashboardInfoSekolah;
