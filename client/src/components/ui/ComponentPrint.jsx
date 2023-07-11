import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Button from './Button';
import { IconPrint } from './Icons';

function ComponentPrint({ ComponentToPrint, DataDocument }) {
  const componentRef = useRef(null);

  // const handleBeforePrint = useCallback(() => {
  //   console.log('first');
  // }, []);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef]);

  const handlePrint = useReactToPrint({
    documentTitle: DataDocument?.documentTitle,
    content: reactToPrintContent,
    // onBeforePrint: handleBeforePrint,
  });

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex justify-end">
        <Button OnClick={() => handlePrint()} ButtonStyle="LINK_PRIMARY">
          <IconPrint /> Cetak
        </Button>
      </div>
      <ComponentToPrint ref={componentRef} Data={DataDocument?.data} />
    </div>
  );
}

ComponentPrint.propTypes = {
  ComponentToPrint: PropTypes.object,
  DataDocument: PropTypes.object,
};

export default ComponentPrint;
