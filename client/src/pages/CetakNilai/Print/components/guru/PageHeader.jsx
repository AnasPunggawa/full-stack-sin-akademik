import LogoSekolah from './../../../../../assets/images/logo-smpn1-binamu.webp';

function PageHeader() {
  return (
    <table className="w-full uppercase">
      <tbody className="w-full flex flex-col items-center text-center">
        <tr className="mb-2">
          <td>
            <img
              src={LogoSekolah}
              className="h-24 w-24 mr-3"
              alt="Logo UPT SMP Negeri 1 Binamu"
            />
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="text-base font-semibold">UPT SMP NEGERI 1 BINAMU</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="text-sm font-semibold">KABUPATEN JENEPONTO</h3>
          </td>
        </tr>
        <tr>
          <td className="text-sm text-center">
            Jl. Lanto Daeng Pasewang No. 32 Bontosunggu, Kelurahan Empoang,
            <br />
            Kecamatan Binamu 92311
          </td>
        </tr>
        <tr>
          <td className="text-sm">Telp. xxxx Fax. xxxx</td>
        </tr>
        <tr className="py-4">
          <td>
            <h3 className="text-base font-semibold border-b-2 border-black">
              LAPORAN NILAI
            </h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default PageHeader;
