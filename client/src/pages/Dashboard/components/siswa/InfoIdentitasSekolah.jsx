import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../../utils/capitalizeFirstLetter';

function InfoIdentitasSekolah({ IdentitasSekolah }) {
  return (
    <div className="rounded-md bg-white dark:bg-gray-700">
      <h3 className="p-3 font-semibold text-base text-white bg-yellow-500 dark:bg-yellow-600 rounded-t-md">
        Identitas Sekolah
      </h3>
      <div className="w-full p-3">
        <table className="w-full p-3">
          <tbody>
            <tr>
              <td width="50%">NPSN</td>
              <td>:</td>
              <td>{IdentitasSekolah?.npsn ? IdentitasSekolah?.npsn : '-'}</td>
            </tr>
            <tr>
              <td width="50%">Status</td>
              <td>:</td>
              <td>
                {IdentitasSekolah?.status
                  ? capitalizeFirstLetter(IdentitasSekolah?.status)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Bentuk Pendidikan</td>
              <td>:</td>
              <td>
                {IdentitasSekolah?.bentuk_pendidikan
                  ? IdentitasSekolah?.bentuk_pendidikan.toUpperCase()
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Status Kepemilikan</td>
              <td>:</td>
              <td>
                {IdentitasSekolah?.status_kepemilikan
                  ? capitalizeFirstLetter(IdentitasSekolah?.status_kepemilikan)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">SK Pendirian Sekolah</td>
              <td>:</td>
              <td>
                {IdentitasSekolah?.sk_pendirian_sekolah
                  ? IdentitasSekolah?.sk_pendirian_sekolah.toUpperCase()
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Tanggal SK Pendirian</td>
              <td>:</td>
              <td>
                {IdentitasSekolah?.tanggal_sk_pendirian
                  ? IdentitasSekolah?.tanggal_sk_pendirian
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">SK Izin Operasional</td>
              <td>:</td>
              <td>
                {IdentitasSekolah?.sk_izin_operasional
                  ? IdentitasSekolah?.sk_izin_operasional.toUpperCase()
                  : '-'}
              </td>
            </tr>
            <tr>
              <td width="50%">Tanggal SK Izin Operasional</td>
              <td>:</td>
              <td>
                {IdentitasSekolah?.tanggal_sk_izin_operasional
                  ? IdentitasSekolah?.tanggal_sk_izin_operasional
                  : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

InfoIdentitasSekolah.propTypes = {
  IdentitasSekolah: PropTypes.object,
};

export default InfoIdentitasSekolah;
