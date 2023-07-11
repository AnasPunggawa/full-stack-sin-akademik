import { useLocation } from 'react-router-dom';

function SiswaPrint() {
  const { state } = useLocation();
  console.log(state);
  return <div>SiswaPrint</div>;
}

export default SiswaPrint;
