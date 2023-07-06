import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import Form from '../../../components/form/Form';
import InputField from '../../../components/form/InputField';
import InputSelect from '../../../components/form/InputSelect';
import { useEffect, useState } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import { createUser } from '../../../api/users';
import BoxError from '../../../components/ui/BoxError';
import InputRequired from '../../../components/form/InputRequired';
import { SELECT_ROLE } from '../../../config/role';

// const SELECT_ROLES = [
//   {
//     id: 'admin',
//     name: 'Admin',
//   },
//   {
//     id: 'guru',
//     name: 'Guru',
//   },
//   {
//     id: 'siswa',
//     name: 'Siswa',
//   },
// ];

function NewUser() {
  useTitle('Tambah User');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [konfPassword, setKonfPassword] = useState('');
  const [isShortPassword, setIsShortPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [role, setRole] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function createNewUser(formData) {
    setIsError(false);
    setIsLoading(true);
    try {
      console.log('CREATE USER');
      const response = await createUser(formData);
      const data = response.data.data;
      console.log(data);
      navigate('/users');
    } catch (error) {
      setIsError(true);
      if (error.response.data.status === 500)
        return setErrorMessage('Something went wrong');
      if (error.response) return setErrorMessage(error.response.data.message);
      return setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  // async function submitNewUser(e) {
  function submitNewUser(e) {
    e.preventDefault();

    if (username === '') {
      setIsError(true);
      setErrorMessage('Username harus diisi');
      return;
    }

    if (password === '') {
      setIsError(true);
      setErrorMessage('Password harus diisi');
      return;
    }

    if (konfPassword === '') {
      setIsError(true);
      setErrorMessage('Konfirmasi password harus diisi');
      return;
    }

    if (role === '') {
      setIsError(true);
      setErrorMessage('Role harus dipilih');
      return;
    }

    // setError(false);
    // setIsLoading(true);
    // try {
    //   console.log('CREATE USER');
    //   const formData = {
    //     username,
    //     password,
    //     role,
    //   };
    //   const response = await createUser(formData);
    //   const data = response.data.data;
    //   console.log(data);
    //   navigate('/users');
    // } catch (error) {
    //   setError(true);
    //   if (error.response.data.status === 500) {
    //     setErrorMessage('Something went wrong');
    //     return;
    //   }
    //   if (error.response) {
    //     setErrorMessage(error.response.data.message);
    //     return;
    //   }
    //   setErrorMessage('Something went wrong');
    //   return;
    // } finally {
    //   setIsLoading(false);
    // }

    // USING FUNCTION
    const formData = {
      username,
      password,
      role,
    };
    createNewUser(formData);
    return;
  }

  function cancelNewUser() {
    navigate('/users');
  }

  useEffect(() => {
    if (password.length < 8 && password.length > 0) {
      setIsShortPassword(false);
      return;
    }
    setIsShortPassword(true);
    return;
  }, [password]);

  useEffect(() => {
    if (password !== konfPassword) {
      setIsPasswordMatch(false);
      return;
    }
    // setIsShortPassword(true);
    setIsPasswordMatch(true);
    return;
  }, [password, konfPassword]);

  useEffect(() => {
    setErrorMessage('');
    setIsError(false);
    return;
  }, [username, password, konfPassword, role]);

  useEffect(() => {
    if (
      username === '' ||
      password === '' ||
      konfPassword === '' ||
      role === '' ||
      !isPasswordMatch ||
      !isShortPassword
    )
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [
    username,
    password,
    konfPassword,
    role,
    isPasswordMatch,
    isShortPassword,
  ]);

  return (
    <>
      <Header>Tambah User</Header>
      <Container>
        <div className="p-5 space-y-4 md:space-y-6 sm:p-7">
          {isLoading && <p>Loading...</p>}
          {isError && <BoxError>{errorMessage}</BoxError>}
          <Form OnSubmit={submitNewUser}>
            <InputField
              HtmlFor="username"
              Type="text"
              Value={username}
              Placeholder="username"
              Required={true}
              OnChange={(e) => {
                setUsername(e.target.value);
              }}
            >
              Username
              <InputRequired />
            </InputField>
            <InputField
              HtmlFor="password"
              Type="password"
              Value={password}
              Placeholder="••••••••"
              Required={true}
              OnChange={(e) => {
                setPassword(e.target.value);
              }}
            >
              Password
              <InputRequired /> <br />
              {!isShortPassword && (
                <p className="text-xs text-red-500">
                  Password minimal 8 karakter
                </p>
              )}
            </InputField>
            <InputField
              HtmlFor="konfPassword"
              Type="password"
              Value={konfPassword}
              Placeholder="••••••••"
              Required={true}
              OnChange={(e) => {
                setKonfPassword(e.target.value);
              }}
            >
              Konfirmasi Password
              <InputRequired /> <br />
              {!isPasswordMatch && (
                <p className="text-xs text-red-500">Password tidak sama</p>
              )}
            </InputField>
            <InputSelect
              Options={SELECT_ROLE}
              HtmlFor={'role'}
              PlaceHolder={'Role'}
              Required={true}
              Value={role}
              OnChange={(e) => {
                setRole(e.target.value);
              }}
            >
              Pilih Role
              <InputRequired />
            </InputSelect>
            <div className="flex gap-2 sm:gap-4 justify-end sm:justify-center">
              <Button Type="submit" Disabled={isInputValid ? false : true}>
                Simpan
              </Button>
              <Button OnClick={() => cancelNewUser()} ButtonStyle="DANGER">
                Batal
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default NewUser;
