import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import PageHeader from './PageHeader';
import PageBodyInfo from './PageBodyInfo';
import PageBodyNilai from './PageBodyNilai';
import PageFooter from './PageFooter';

const ComponentToPrint = forwardRef(function ComponentToPrint({ Data }, ref) {
  const { siswa, nilai } = Data;
  return (
    <div className="flex justify-start min-[900px]:justify-center overflow-x-auto">
      <div
        ref={ref}
        className="bg-white text-black font-sans page-print py-8 px-12 min-w-[21cm] min-h-[29.7cm] rounded-md"
      >
        <PageHeader />
        <PageBodyInfo Info={siswa} />
        <PageBodyNilai Nilai={nilai} />
        <PageFooter />
      </div>
    </div>
  );
});

ComponentToPrint.propTypes = {
  Text: PropTypes.string,
  Data: PropTypes.object,
};

export default ComponentToPrint;
