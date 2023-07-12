import PropTypes from 'prop-types';

const TABLE_HEAD_LAPORAN = [
  {
    name: 'No',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '5%',
  },
  {
    name: 'NIS',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '15%',
  },
  {
    name: 'NISN',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '20%',
  },
  {
    name: 'Nama',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '36%',
  },
  {
    name: 'Nilai',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '12%',
  },
  {
    name: 'Predikat',
    style: 'text-sm px-1.5 font-normal border border-black',
    width: '12%',
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
                  {item.siswa_nis}
                </td>
                <td className="text-sm px-1.5 border border-black">
                  {item.siswa_nisn}
                </td>
                <td className="text-sm px-1.5 border border-black">
                  {item.siswa_nama}
                </td>
                <td className="text-sm px-1.5 text-center border border-black">
                  {item.nilai ? item.nilai : '-'}
                </td>
                <td className="text-sm px-1.5 text-center border border-black">
                  {item.predikat ? item.predikat : '-'}
                </td>
              </tr>
            );
          })}
        <tr>
          <td
            colSpan={4}
            className="text-sm px-1.5 text-end border border-black"
          >
            Jumlah
          </td>
          <td className="text-sm px-1.5 text-center border border-black">
            {totalNilai}
          </td>
          <td className="text-sm px-1.5 text-center border border-black"></td>
        </tr>
        <tr>
          <td
            colSpan={4}
            className="text-sm px-1.5 text-end border border-black"
          >
            Rata-rata
          </td>
          <td className="text-sm px-1.5 text-center border border-black">
            {rataRataNilai}
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
