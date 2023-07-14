import { useEffect, useState } from 'react';
import LogoSekolah from '../../assets/images/logo-smpn1-binamu.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTitle } from '../../hooks/useTitle';
import { authLogin } from '../../api/auth';
import jwtDecode from 'jwt-decode';
import { ACTION_AUTH_REDUCER_CONTEXT } from '../../reducer/authReducerContext';
import Button from '../../components/ui/Button';
import Form from '../../components/form/Form';
import InputField from '../../components/form/InputField';
import Checkbox from '../../components/form/Checkbox';
import BoxError from '../../components/ui/BoxError';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location?.state?.from?.pathname || '/';

  const { dispatch } = useAuthContext();

  useTitle('Login');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return navigate('/');
    }
    return;
  }, [navigate]);

  useEffect(() => {
    setErrorMessage('');
    setError(false);
  }, [username, password]);

  async function handleLogin(e) {
    e.preventDefault();
    if (username === '') {
      setError(true);
      setErrorMessage('Username harus diisi');
      return;
    }
    if (password === '') {
      setError(true);
      setErrorMessage('Password harus diisi');
      return;
    }

    try {
      console.log(ACTION_AUTH_REDUCER_CONTEXT.LOGIN);
      const formData = { username, password };
      const response = await authLogin(formData);
      const data = response.data.data;
      const decodeJwt = jwtDecode(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      dispatch({
        type: ACTION_AUTH_REDUCER_CONTEXT.LOGIN,
        payload: { accessToken: data.accessToken, user: decodeJwt },
      });

      setUsername('');
      setPassword('');
      setErrorMessage('');
      setError(false);
      return navigate(fromLocation, { replace: true });
    } catch (error) {
      if (error.response.data.status === 500) {
        setErrorMessage('Something went wrong');
        setError(true);
        return;
      }
      if (error.response) {
        setErrorMessage(error.response.data.message);
        setError(true);
        return;
      }
      setErrorMessage('Something went wrong');
      setError(true);
      return;
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex flex-col items-center mb-6 text-gray-900 dark:text-white">
            <img
              className="w-28 h-28 mb-2 sm:w-32 sm:h-32"
              src={LogoSekolah}
              alt="logo"
            />
            <h1 className="text-3xl font-bold">SIN Akademik</h1>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
              {error && <BoxError>{errorMessage}</BoxError>}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login ke akun anda
              </h1>
              <Form OnSubmit={handleLogin}>
                <div>
                  <InputField
                    HtmlFor="username"
                    Type="text"
                    Value={username}
                    Placeholder="username"
                    Required={true}
                    OnChange={(e) => setUsername(e.target.value)}
                  >
                    Username
                  </InputField>
                </div>
                <div>
                  <InputField
                    HtmlFor="password"
                    Type={showPassword ? 'text' : 'password'}
                    Value={password}
                    Placeholder="••••••••"
                    Required={true}
                    OnChange={(e) => setPassword(e.target.value)}
                  >
                    Password
                  </InputField>
                </div>
                <div>
                  <Checkbox
                    Label="Lihat Password"
                    Id="showPassword"
                    Value={showPassword}
                    OnChange={handleShowPassword}
                  />
                </div>
                <Button
                  ClassName="w-full"
                  Type="submit"
                  Disabled={username === '' || password === '' ? true : false}
                >
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
