import PropTypes from 'prop-types';
import { getDateNow } from '../../../../utils/getDateNow';

function PageFooter({ DataSekolah }) {
  const { dataProfil, dataKontak } = DataSekolah,
    dateNow = getDateNow(),
    namaSekolah = dataProfil?.nama_sekolah,
    kabupatenSekolah = dataKontak?.kabupaten;

  return (
    <div className="w-full flex flex-col items-end uppercase">
      <div className="pr-10">
        <p className="text-sm">
          {kabupatenSekolah ? kabupatenSekolah : 'kabupaten'}, {dateNow}
        </p>
        <p className="text-sm mb-16">Sekolah, </p>
        <p className="text-sm">{namaSekolah ? namaSekolah : 'sekolah'}</p>
      </div>
    </div>
  );
}

PageFooter.propTypes = {
  DataSekolah: PropTypes.object,
};

export default PageFooter;
