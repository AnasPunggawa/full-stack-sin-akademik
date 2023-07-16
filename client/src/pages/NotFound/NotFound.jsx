import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import Button from '../../components/ui/Button';

function NotFound() {
  useTitle('Not Found');
  const navigate = useNavigate();

  function backHome() {
    // console.log('back to home');
    return navigate('/', { replace: true });
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-700">
        <h1 className="text-3xl sm:text-6xl lg:text-9xl font-bold mb-5 text-gray-900 dark:text-white">
          <span className="text-red-500">404</span> Not Found
        </h1>
        <Button OnClick={backHome} Type="button">
          Back Home
        </Button>
      </div>
    </>
  );
}

export default NotFound;
