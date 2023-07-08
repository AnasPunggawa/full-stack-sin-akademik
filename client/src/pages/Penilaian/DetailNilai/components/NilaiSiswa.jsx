import PropTypes from 'prop-types';
import InputField from '../../../../components/form/InputField';
import InputTextarea from '../../../../components/form/InputTextarea';

function NilaiSiswa({ Nilai }) {
  const {
    namaSiswa,
    nisnSiswa,
    namaGuru,
    nipGuru,
    semester,
    kelas,
    mataPelajaran,
    nilai,
    predikat,
    catatan,
  } = Nilai;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
          Data Nilai
        </h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* NAMA SISWA */}
        <InputField
          HtmlFor="nama-siswa"
          Type="text"
          Value={namaSiswa}
          Placeholder={namaSiswa}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nama Siswa
        </InputField>
        {/* NISN SISWA */}
        <InputField
          HtmlFor="nisn-siswa"
          Type="text"
          Value={nisnSiswa}
          Placeholder={nisnSiswa}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          NISN Siswa
        </InputField>
        {/* SEMESTER */}
        <InputField
          HtmlFor="semester"
          Type="text"
          Value={semester}
          Placeholder={semester}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Semester
        </InputField>
        {/* KELAS */}
        <InputField
          HtmlFor="kelas"
          Type="text"
          Value={kelas}
          Placeholder={kelas}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Kelas
        </InputField>
        {/* MATA PELAJARAN */}
        <InputField
          HtmlFor="mata-pelajaran"
          Type="text"
          Value={mataPelajaran}
          Placeholder={mataPelajaran}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Mata Pelajaran
        </InputField>
        {/* NAMA GURU */}
        <InputField
          HtmlFor="nama-guru"
          Type="text"
          Value={namaGuru}
          Placeholder={namaGuru}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nama Guru
        </InputField>
        {/* NIP GURU */}
        <InputField
          HtmlFor="nip-guru"
          Type="text"
          Value={nipGuru}
          Placeholder={nilai}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          NIP Guru
        </InputField>
        {/* NILAI */}
        <InputField
          HtmlFor="nilai"
          Type="text"
          Value={nilai}
          Placeholder={nilai}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Nilai
        </InputField>
        {/* PREDIKAT */}
        <InputField
          HtmlFor="predikat"
          Type="text"
          Value={predikat}
          Placeholder={predikat}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Predikat
        </InputField>
        {/* Catatan */}
        <InputTextarea
          HtmlFor="catatan"
          Value={catatan}
          Placeholder={catatan}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Catatan
        </InputTextarea>
      </div>
    </div>
  );
}

NilaiSiswa.propTypes = {
  Nilai: PropTypes.object,
};

export default NilaiSiswa;
