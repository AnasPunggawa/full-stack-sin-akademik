import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../../utils/capitalizeFirstLetter';

function InfoKontakSekolah({ KontakSekolah }) {
  return (
    <div className="rounded-md bg-white dark:bg-gray-700">
      <h3 className="p-3 font-semibold text-base text-white bg-green-500 dark:bg-green-600 rounded-t-md">
        Kontak Sekolah
      </h3>
      <div className="w-full p-3">
        <table className="w-full p-3">
          <tbody>
            <tr>
              <td width="50%">Alamat</td>
              <td>:</td>
              <td>
                {KontakSekolah?.alamat
                  ? capitalizeFirstLetter(KontakSekolah?.alamat)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">RT / RW</td>
              <td>:</td>
              <td>
                {KontakSekolah?.rt ? KontakSekolah?.rt : '-'} /{' '}
                {KontakSekolah?.rw ? KontakSekolah?.rw : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Dusun</td>
              <td>:</td>
              <td>
                {KontakSekolah?.dusun
                  ? capitalizeFirstLetter(KontakSekolah?.dusun)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Desa atau Kelurahan</td>
              <td>:</td>
              <td>
                {KontakSekolah?.desa_kelurahan
                  ? capitalizeFirstLetter(KontakSekolah?.desa_kelurahan)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Kecamatan</td>
              <td>:</td>
              <td>
                {KontakSekolah?.kecamatan
                  ? capitalizeFirstLetter(KontakSekolah?.kecamatan)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Kabupaten</td>
              <td>:</td>
              <td>
                {KontakSekolah?.kabupaten
                  ? capitalizeFirstLetter(KontakSekolah?.kabupaten)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Provinsi</td>
              <td>:</td>
              <td>
                {KontakSekolah?.provinsi
                  ? capitalizeFirstLetter(KontakSekolah?.provinsi)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Kode Pos</td>
              <td>:</td>
              <td>{KontakSekolah?.kode_pos ? KontakSekolah?.kode_pos : '-'}</td>
            </tr>
            <tr>
              <td width="50%">Nomor Telepon</td>
              <td>:</td>
              <td>
                {KontakSekolah?.nomor_telepon
                  ? KontakSekolah?.nomor_telepon
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Email</td>
              <td>:</td>
              <td>{KontakSekolah?.email ? KontakSekolah?.email : '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

InfoKontakSekolah.propTypes = {
  KontakSekolah: PropTypes.object,
};

export default InfoKontakSekolah;
