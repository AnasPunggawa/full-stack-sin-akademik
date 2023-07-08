import { useParams } from 'react-router-dom';

function DetailNilai() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default DetailNilai;
