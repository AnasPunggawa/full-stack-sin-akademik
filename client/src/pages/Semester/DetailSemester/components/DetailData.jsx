import PropTypes from 'prop-types';
import Form from '../../../../components/form/Form';
import InputField from '../../../../components/form/InputField';
import { useState } from 'react';

function DetailData({ DataSemester }) {
  const { kodeSemester, tahunAjaran, semester, status } = DataSemester;
  const [namaKodeSemester, setNamaKodeSemester] = useState(kodeSemester);
  const [tahunAjaraSemester, setTahunAjaraSemester] = useState(tahunAjaran);
  const [tingkatSemester, setTingkatSemester] = useState(semester);
  const [statusSemester, setStatusSemester] = useState(status);

  return (
    <div className="w-full h-full p-4">
      <Form OnSubmit={() => {}}>
        <InputField
          HtmlFor="kode-semester"
          Type="text"
          Value={namaKodeSemester}
          Placeholder={kodeSemester}
          Required={true}
          Disabled={true}
          OnChange={(e) => setNamaKodeSemester(e.target.value)}
        >
          Kode Semester
        </InputField>
        <InputField
          HtmlFor="tahun-ajaran"
          Type="text"
          Value={tahunAjaraSemester}
          Placeholder={tahunAjaran}
          Required={true}
          Disabled={true}
          OnChange={(e) => setTahunAjaraSemester(e.target.value)}
        >
          Tahun Ajaran
        </InputField>
        <InputField
          HtmlFor="semester"
          Type="text"
          Value={tingkatSemester}
          Placeholder={semester}
          Required={true}
          Disabled={true}
          OnChange={(e) => setTingkatSemester(e.target.value)}
        >
          Semester
        </InputField>
        <InputField
          HtmlFor="status-semester"
          Type="text"
          Value={statusSemester ? 'Aktif' : 'Tidak Aktif'}
          Placeholder={status ? 'Aktif' : 'Tidak Aktif'}
          Required={true}
          Disabled={true}
          OnChange={(e) => setStatusSemester(e.target.value)}
        >
          Status Semester
        </InputField>
      </Form>
    </div>
  );
}

DetailData.propTypes = {
  DataSemester: PropTypes.object,
};

export default DetailData;
