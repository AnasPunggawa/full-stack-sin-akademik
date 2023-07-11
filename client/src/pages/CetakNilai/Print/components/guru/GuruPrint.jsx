import { useLocation } from 'react-router-dom';

function GuruPrint() {
  const { state } = useLocation();
  console.log(state);
  return <div>GuruPrint</div>;
}

export default GuruPrint;
