import LogoSekolah from '../../../../assets/images/logo-smpn1-binamu.webp';
function InfoProfileSekolah() {
  return (
    <div className="rounded-md bg-white dark:bg-gray-700">
      <h3 className="p-3 font-semibold text-base text-white bg-blue-500 dark:bg-blue-600 rounded-t-md">
        Profil Sekolah
      </h3>
      <div className="p-3 space-y-2">
        <img
          src={LogoSekolah}
          className="h-24 mx-auto"
          alt="Logo UPT SMP Negeri 1 Binamu"
        />
        <h4 className="text-center font-semibold">UPT SMP NEGERI 1 BINAMU</h4>
        <table className="w-full">
          <tbody>
            <tr>
              <td>Kepala Sekolah</td>
              <td>:</td>
              <td>Nama Kepala Sekolah</td>
            </tr>
            <tr>
              <td>Operator</td>
              <td>:</td>
              <td>Nama Operator Sekolah</td>
            </tr>
            <tr>
              <td>Akreditasi</td>
              <td>:</td>
              <td>Akreditasi Sekolah</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InfoProfileSekolah;
