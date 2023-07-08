import { useState } from 'react';
import Form from '../../../components/form/Form';
import { useTitle } from '../../../hooks/useTitle';
import Container from '../components/Container';
import Header from '../components/Header';
import SelectSemester from './components/SelectSemester';
import SelectKelas from './components/SelectKelas';
import SelectMataPelajaran from './components/SelectMataPelajaran';

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
              <SelectSemester SetKodeSemester={setKodeSemester} />
              <SelectKelas SetKodeKelas={setKodeKelas} />
              <SelectMataPelajaran
                SetKodeMataPelajaran={setKodeMataPelajaran}
              />
            </div>
          </Form>
        </div>
        <h1>Kode Semester: {kodeSemester}</h1>
        <h1>Kode Kelas: {kodeKelas}</h1>
        <h1>Kode Mata Pelajaran: {kodeMataPelajaran}</h1>
      </Container>
    </>
  );
}

export default NewNilai;
