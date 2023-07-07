import { useEffect, useState } from 'react';
import InputSearch from '../../../../components/form/InputSearch';
import Button from '../../../../components/ui/Button';
import { IconPlus } from '../../../../components/ui/Icons';
import Container from '../Container';
import Header from '../Header';
import SelectSemester from './SelectSemester';
import SelectKelas from './SelectKelas';
import SelectMataPelajaran from './SelectMataPelajaran';

function GuruPenilaian() {
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [terapkan, setTerapkan] = useState(0);
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    if (!kodeSemester) {
      setKodeSemester('');
      return;
    }
    return;
  }, [kodeSemester]);

  useEffect(() => {
    let formData = null;
    if (kodeSemester && kodeKelas && kodeMataPelajaran) {
      formData = {
        kodeSemester,
        kodeKelas,
        kodeMataPelajaran,
      };
    }
    console.log(formData);
    return;
  }, [kodeSemester, kodeKelas, kodeMataPelajaran]);

  function tambahNilai() {
    console.log('tambah nilai');
  }

  function handleTerapkan() {
    setTerapkan((prev) => prev + 1);
    console.log(terapkan);
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log('search nama siswa', inputSearch);
  }

  return (
    <>
      <Header>Penilaian</Header>
      <Container>
        <div className="w-full flex flex-col gap-3 p-4">
          <div className="w-full">
            <Button OnClick={() => tambahNilai()}>
              Tambah Nilai <IconPlus />
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 items-end justify-between">
            {/* <div className="flex w-full sm:w-2/6 flex-col gap-2"> */}
            <div className="w-full grid gap-2 md:grid-cols-2">
              <SelectSemester SetKodeSemester={setKodeSemester} />
              <SelectKelas SetKodeKelas={setKodeKelas} />
              <SelectMataPelajaran
                SetKodeMataPelajaran={setKodeMataPelajaran}
              />
              <div className="w-full flex gap-2 items-end justify-between flex-wrap sm:flex-nowrap">
                <Button OnClick={() => handleTerapkan()}>Terapkan</Button>
                <form onSubmit={(e) => handleSearch(e)}>
                  <InputSearch
                    Placeholder={'Cari siswa'}
                    Value={inputSearch}
                    OnChange={(e) => setInputSearch(e.target.value)}
                  />
                </form>
              </div>
            </div>
            {/* <div className="w-full flex items-center justify-between">
              <Button OnClick={() => tambahNilai()}>Selesai</Button>
              <form onSubmit={(e) => handleSearch(e)}>
                <InputSearch
                  Placeholder={'Cari siswa'}
                  Value={inputSearch}
                  OnChange={(e) => setInputSearch(e.target.value)}
                />
              </form>
            </div> */}
          </div>
        </div>
        <h1>Kode Semester: {kodeSemester}</h1>
        <h1>Kode Kelas: {kodeKelas}</h1>
        <h1>Kode Mata Pelajaran: {kodeMataPelajaran}</h1>
      </Container>
    </>
  );
}

export default GuruPenilaian;
