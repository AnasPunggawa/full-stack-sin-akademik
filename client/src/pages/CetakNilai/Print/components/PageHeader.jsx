import PropTypes from 'prop-types';
import LogoSekolah from '../../../../assets/images/logo-smpn1-binamu.webp';

function PageHeader({ PageTitle = 'LAPORAN NILAI', DataSekolah }) {
  const { dataProfil, dataKontak } = DataSekolah,
    namaSekolah = dataProfil?.nama_sekolah,
    alamat = dataKontak?.alamat ? `${dataKontak?.alamat},` : '',
    kabupaten = dataKontak?.kabupaten
      ? `kabupaten ${dataKontak?.kabupaten},`
      : '',
    provinsi = dataKontak?.provinsi ? `provinsi ${dataKontak?.provinsi}` : '',
    kodePos = dataKontak?.kode_pos ? dataKontak?.kode_pos : '',
    alamatLengkap = `${alamat} ${kabupaten} ${provinsi} ${kodePos}`,
    telepon = dataKontak?.nomor_telepon,
    email = dataKontak?.email;

  return (
    <table className="w-full">
      <tbody className="w-full flex flex-col items-center text-center">
        <tr className="mb-2">
          <td>
            <img
              src={LogoSekolah}
              className="h-24 w-24"
              alt="Logo UPT SMP Negeri 1 Binamu"
            />
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="text-base font-semibold uppercase">
              {namaSekolah ? namaSekolah : 'SEKOLAH'}
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="text-sm font-semibold uppercase">
              KABUPATEN {dataKontak?.kabupaten ? dataKontak?.kabupaten : ''}
            </h3>
          </td>
        </tr>
        <tr>
          <td className="text-sm text-center uppercase">
            {alamatLengkap ? alamatLengkap : 'Alamat Sekolah'}
          </td>
        </tr>
        <tr>
          <td className="text-sm">
            TELEPON: {telepon ? telepon : '-'}, EMAIL:{' '}
            {email ? email?.toLowerCase() : '-'}
          </td>
        </tr>
        <tr className="py-4">
          <td>
            <h3 className="text-base font-semibold border-b-2 border-black">
              {PageTitle}
            </h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

PageHeader.propTypes = {
  PageTitle: PropTypes.string,
  DataSekolah: PropTypes.object,
};

export default PageHeader;
