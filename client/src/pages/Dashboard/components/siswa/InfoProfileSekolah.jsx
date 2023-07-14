import PropTypes from 'prop-types';
import LogoSekolah from '../../../../assets/images/logo-smpn1-binamu.webp';
function InfoProfileSekolah({ ProfilSekolah }) {
  return (
    <div className="rounded-md bg-white dark:bg-gray-700">
      {/* <h3 className="p-3 font-semibold text-base text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 rounded-t-md"> */}
      <h3 className="p-3 font-semibold text-base text-white bg-red-500 dark:bg-red-600 rounded-t-md">
        Profil Sekolah
      </h3>
      <div className="p-3 space-y-2">
        <img
          src={LogoSekolah}
          className="h-24 mx-auto"
          alt="Logo UPT SMP Negeri 1 Binamu"
        />
        <h4 className="text-center font-semibold">
          {ProfilSekolah?.nama_sekolah
            ? ProfilSekolah?.nama_sekolah
            : 'NAMA SEKOLAH'}
        </h4>
        <table className="w-full">
          <tbody>
            <tr>
              <td width="50%">Kepala Sekolah</td>
              <td>:</td>
              <td>
                {ProfilSekolah?.nama_kepala_sekolah
                  ? ProfilSekolah?.nama_kepala_sekolah
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Operator</td>
              <td>:</td>
              <td>
                {ProfilSekolah?.nama_operator
                  ? ProfilSekolah?.nama_operator
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Akreditasi</td>
              <td>:</td>
              <td>
                {ProfilSekolah?.akreditasi
                  ? ProfilSekolah?.akreditasi.toUpperCase()
                  : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

InfoProfileSekolah.propTypes = {
  ProfilSekolah: PropTypes.object,
};

export default InfoProfileSekolah;
