import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import InputSelect from '../../../../components/form/InputSelect';
import { SELECT_KELAS, SELECT_KODE } from '../../../../config/kelas';

function SelectKelas({ SetKodeKelas }) {
  const [kelas, setKelas] = useState('');
  const [kode, setKode] = useState('');

  useEffect(() => {
    if (kelas && kode) return SetKodeKelas(`${kelas}-${kode}`);
    return SetKodeKelas('');
  }, [kelas, kode]);

  return (
    <>
      <InputSelect
        HtmlFor={'kelas'}
        PlaceHolder={'Pilih Kelas'}
        SelectSize="SMALL"
        Options={SELECT_KELAS}
        Value={kelas}
        OnChange={(e) => setKelas(e.target.value)}
      >
        Kelas
      </InputSelect>
      <InputSelect
        HtmlFor={'kode'}
        PlaceHolder={'Pilih Kode'}
        SelectSize="SMALL"
        Options={SELECT_KODE}
        Value={kode}
        OnChange={(e) => setKode(e.target.value)}
      >
        Kode
      </InputSelect>
    </>
  );
}

SelectKelas.propTypes = {
  SetKodeKelas: PropTypes.func,
};

export default SelectKelas;
