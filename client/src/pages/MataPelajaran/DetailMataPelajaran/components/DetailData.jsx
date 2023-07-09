import PropTypes from 'prop-types';
// import Form from '../../../../components/form/Form';
import InputField from '../../../../components/form/InputField';
import { useState } from 'react';
import TableDataGuru from './TableDataGuru';
import { useLocation } from 'react-router-dom';
import BoxError from '../../../../components/ui/BoxError';
import BoxSuccess from '../../../../components/ui/BoxSuccess';

function DetailData({ DataMataPelajaran }) {
  const { state } = useLocation();

  const { nama, guru } = DataMataPelajaran;
  const [namaMataPelajaran, setNamaMataPelajaran] = useState(nama);

  return (
    <div className="w-full h-full p-4 space-y-4">
      {state && !state?.success && <BoxError>{state?.message}</BoxError>}
      {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
      {/* <Form OnSubmit={() => {}}> */}
      <InputField
        HtmlFor="nama-mata-pelajaran"
        Type="text"
        Value={namaMataPelajaran}
        Placeholder="Nama Mata Pelajaran"
        Required={true}
        Disabled={true}
        OnChange={(e) => setNamaMataPelajaran(e.target.value)}
      >
        Nama Mata Pelajaran
      </InputField>
      <div className="w-full">
        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Data Guru
        </p>
        <TableDataGuru DataGuru={guru} />
      </div>
      {/* </Form> */}
    </div>
  );
}

DetailData.propTypes = {
  DataMataPelajaran: PropTypes.object,
};

export default DetailData;
