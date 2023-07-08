import { useState } from 'react';
import Form from '../../../components/form/Form';
import { useTitle } from '../../../hooks/useTitle';
import Container from '../components/Container';
import Header from '../components/Header';
import SelectSemester from './components/SelectSemester';
import SelectKelas from './components/SelectKelas';
import SelectMataPelajaran from './components/SelectMataPelajaran';
import SearchNamaSiswa from './components/SearchNamaSiswa';
import InputField from '../../../components/form/InputField';
import InputRequired from '../../../components/form/InputRequired';
import InputTextarea from '../../../components/form/InputTextarea';

function NewNilai() {
  useTitle('Tambah Nilai');
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [siswaID, setSiswaID] = useState('');
  const [nilai, setNilai] = useState('');
  const [predikat, setPredikat] = useState('');
  const [catatan, setCatatan] = useState('');

  return (
    <>
      <Header>Tambah Nilai</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          <Form OnSubmit={() => {}}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {/* SEMESTER */}
              <SelectSemester SetKodeSemester={setKodeSemester} />
              {/* KELAS */}
              <SelectKelas SetKodeKelas={setKodeKelas} />
              {/* MATA PELAJARAN */}
              <SelectMataPelajaran
                SetKodeMataPelajaran={setKodeMataPelajaran}
              />
              {/* NAMA SISWA */}
              <SearchNamaSiswa SetSiswaID={setSiswaID} />
              {/* NILAI */}
              <InputField
                HtmlFor="nilai"
                Type="text"
                Value={nilai}
                Placeholder="nilai"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setNilai(e.target.value);
                }}
              >
                Nilai
                <InputRequired />
              </InputField>
              {/* PREDIKAT */}
              <InputField
                HtmlFor="predikat"
                Type="text"
                Value={predikat}
                Placeholder="predikat"
                Required={true}
                AutoComplete="OFF"
                OnChange={(e) => {
                  setPredikat(e.target.value);
                }}
              >
                Predikat
                <InputRequired />
              </InputField>
              {/* CATATAN */}
              <InputTextarea
                HtmlFor="catatan"
                Placeholder="catatan penilaian"
                Required={true}
                Value={catatan}
                OnChange={(e) => setCatatan(e.target.value)}
              >
                Catatan
                <InputRequired />
              </InputTextarea>
            </div>
          </Form>
        </div>
        <h1>Kode Semester: {kodeSemester}</h1>
        <h1>Kode Kelas: {kodeKelas}</h1>
        <h1>Kode Mata Pelajaran: {kodeMataPelajaran}</h1>
        <h1>Siswa ID: {siswaID}</h1>
        <h1>Nilai: {nilai}</h1>
        <h1>Predikat: {predikat}</h1>
        <h1>Catatan: {catatan}</h1>
      </Container>
    </>
  );
}

export default NewNilai;
