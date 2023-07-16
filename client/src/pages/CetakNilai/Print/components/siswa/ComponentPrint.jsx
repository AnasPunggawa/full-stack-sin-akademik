import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Button from '../../../../../components/ui/Button';
import { IconChevronLeft, IconPrint } from '../../../../../components/ui/Icons';
import { useNavigate } from 'react-router-dom';

function ComponentPrint({ ComponentToPrint, DataDocument }) {
  const componentRef = useRef(null);
  const navigate = useNavigate();

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef]);

  const handlePrint = useReactToPrint({
    documentTitle: DataDocument?.documentTitle,
    content: reactToPrintContent,
    // onBeforePrint: handleBeforePrint,
  });

  function handleKembali() {
    return navigate(DataDocument?.prevLocation);
  }

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex justify-between pb-1 border-b-2 border-gray-300 dark:border-gray-500">
        {DataDocument?.prevLocation && (
          <Button OnClick={() => handleKembali()} ButtonStyle="LINK_SECONDARY">
            <div className="flex items-center gap-1">
              <IconChevronLeft /> Kembali
            </div>
          </Button>
        )}
        <Button OnClick={() => handlePrint()} ButtonStyle="LINK_PRIMARY">
          <div className="flex items-center gap-1">
            <IconPrint /> Cetak
          </div>
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
