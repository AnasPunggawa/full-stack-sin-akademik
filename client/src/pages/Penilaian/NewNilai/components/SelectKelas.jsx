import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import InputSelect from '../../../../components/form/InputSelect';
import { SELECT_KELAS, SELECT_KODE } from '../../../../config/kelas';
import InputRequired from '../../../../components/form/InputRequired';

function SelectKelas({ SetKodeKelas }) {
  const [kelas, setKelas] = useState('');
  const [kode, setKode] = useState('');

  useEffect(() => {
    if (kelas && kode) return SetKodeKelas(`${kelas}-${kode.toLowerCase()}`);
    return SetKodeKelas('');
  }, [kelas, kode]);

  return (
    <>
      <InputSelect
        HtmlFor={'kelas'}
        PlaceHolder={'Pilih Kelas'}
        Options={SELECT_KELAS}
        Value={kelas}
        OnChange={(e) => setKelas(e.target.value)}
      >
        Kelas
        <InputRequired />
      </InputSelect>
      <InputSelect
        HtmlFor={'kode'}
        PlaceHolder={'Pilih Kode'}
        Options={SELECT_KODE}
        Value={kode}
        OnChange={(e) => setKode(e.target.value)}
      >
        Kode
        <InputRequired />
      </InputSelect>
    </>
  );
}

SelectKelas.propTypes = {
  SetKodeKelas: PropTypes.func,
};

export default SelectKelas;
