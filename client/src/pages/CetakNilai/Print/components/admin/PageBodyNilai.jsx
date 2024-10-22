import PropTypes from 'prop-types';
import { averagePredicate } from '../../../../../utils/averagePredicate';

const TABLE_HEAD_LAPORAN = [
  {
    name: 'No',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '5%',
  },
  {
    name: 'Mata Pelajaran',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '50%',
  },
  {
    name: 'Nilai',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '10%',
  },
  {
    name: 'Predikat',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '10%',
  },
  {
    name: 'Keterangan',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '25%',
  },
];

function PageBodyNilai({ Nilai }) {
  const totalNilai = Nilai.filter((item) => {
    return item?.nilai;
  }).reduce((acc, cur) => {
    acc += parseInt(cur?.nilai);
    return acc;
  }, 0);

  const rataRataNilai = (totalNilai / Nilai.length).toFixed(2);
  const rataRataPredikat = averagePredicate(rataRataNilai);

  return (
    <table className="w-full border border-black mb-4 uppercase">
      <thead className="uppercase text-center">
        <tr>
          {TABLE_HEAD_LAPORAN.map((item, index) => {
            return (
              <th key={index} className={item.style} width={item.width}>
                {item.name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {Nilai &&
          Nilai.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="text-sm px-1.5 text-center border border-black">
                  {index + 1}
                </td>
                <td className="text-sm px-1.5 border border-black">
                  {item.name}
                </td>
                <td className="text-sm px-1.5 text-center border border-black">
                  {item.nilai ? item.nilai : '-'}
                </td>
                <td className="text-sm px-1.5 text-center border border-black">
                  {item.predikat ? item.predikat : '-'}
                </td>
                <td className="text-sm px-1.5 border border-black">
                  {item.catatan ? item.catatan : '-'}
                </td>
              </tr>
            );
          })}
        <tr>
          <td
            colSpan={2}
            className="text-sm px-1.5 text-end border border-black"
          >
            Jumlah
          </td>
          <td className="text-sm px-1.5 text-center border border-black">
            {totalNilai}
          </td>
          <td className="text-sm px-1.5 text-center border border-black"></td>
          <td className="text-sm px-1.5 text-center border border-black"></td>
        </tr>
        <tr>
          <td
            colSpan={2}
            className="text-sm px-1.5 text-end border border-black"
          >
            Rata-rata
          </td>
          <td className="text-sm px-1.5 text-center border border-black">
            {rataRataNilai}
          </td>
          <td className="text-sm px-1.5 text-center border border-black">
            {rataRataPredikat}
          </td>
          <td className="text-sm px-1.5 text-center border border-black"></td>
        </tr>
      </tbody>
    </table>
  );
}

PageBodyNilai.propTypes = {
  Nilai: PropTypes.array,
};

export default PageBodyNilai;
