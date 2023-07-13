import LogoSekolah from '../../../../assets/images/logo-smpn1-binamu.webp';

function DashboardHeader() {
  return (
    <div className="w-full text-center border-b-2 border-gray-900 dark:border-white pb-2">
      <img
        src={LogoSekolah}
        className="h-24 mx-auto mb-2"
        alt="Logo UPT SMP Negeri 1 Binamu"
      />
      <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
        SELAMAT DATANG
      </h1>
      <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
        UPT SMP NEGERI 1 BINAMU
      </h2>
    </div>
  );
}

export default DashboardHeader;
