import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../../../api/users';
import BoxError from '../../../../../components/ui/BoxError';
import Form from '../../../../../components/form/Form';
import InputField from '../../../../../components/form/InputField';
import InputRequired from '../../../../../components/form/InputRequired';
import Button from '../../../../../components/ui/Button';

function EditData({ AkunSiswa }) {
  const { id, user_id, users } = AkunSiswa;
  const { username, role, password: currentPassword } = users;
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfPasswordBaru, setKonfPasswordBaru] = useState('');
  const [isShortPasswordBaru, setIsShortPasswordBaru] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  async function handleUpdateAkunSiswa(formData) {
    setIsError(false);
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await updateUser(user_id, formData);
      console.log(response);
      console.log('updated akun siswa');
      navigate(`/siswa/${id}`);
    } catch (error) {
      setIsError(true);
      if (error.response.status === 500)
        return setErrorMessage('Something went wrong');
      if (error.response) return setErrorMessage(error.response.data.message);
      return setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  function submitEditAkunSiswa(e) {
    e.preventDefault();
    if (!checkInput()) return setIsError(true);
    const formData = {
      ...users,
      password: passwordBaru,
    };
    console.log(formData);
    handleUpdateAkunSiswa(formData);
  }

  function checkInput() {
    if (passwordLama === '') {
      setErrorMessage('Password lama harus diisi');
      return false;
    }
    if (passwordBaru === '') {
      setErrorMessage('Password baru harus diisi');
      return false;
    }
    if (konfPasswordBaru === '') {
      setErrorMessage('Konfirmasi password baru harus diisi');
      return false;
    }
    if (passwordLama !== currentPassword) {
      setErrorMessage('Password lama salah');
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (passwordBaru.length < 8 && passwordBaru.length > 0) {
      setIsShortPasswordBaru(true);
      return;
    }
    setIsShortPasswordBaru(false);
    return;
  }, [passwordBaru]);

  useEffect(() => {
    if (passwordBaru !== konfPasswordBaru && konfPasswordBaru.length > 0) {
      setIsPasswordMatch(false);
      return;
    }
    // setIsShortPasswordBaru(true);
    setIsPasswordMatch(true);
    return;
  }, [passwordBaru, konfPasswordBaru]);

  useEffect(() => {
    setErrorMessage('');
    setIsError(false);
    return;
  }, [passwordLama, passwordBaru, konfPasswordBaru]);

  useEffect(() => {
    if (
      passwordLama === '' ||
      passwordBaru === '' ||
      konfPasswordBaru === '' ||
      !isPasswordMatch ||
      isShortPasswordBaru ||
      isError
    )
      return setIsInputValid(false);
    return setIsInputValid(true);
  }, [
    passwordLama,
    passwordBaru,
    konfPasswordBaru,
    isPasswordMatch,
    isShortPasswordBaru,
    isError,
  ]);

  function cancelEditAkunSiswa() {
    navigate(`/siswa/${id}`);
  }

  return (
    <div className="w-full h-full p-4 space-y-4 md:space-y-6">
      {isLoading && <p>Loading...</p>}
      {isError && <BoxError>{errorMessage}</BoxError>}
      <Form OnSubmit={(e) => submitEditAkunSiswa(e)}>
        {/* USERNAME SISWA */}
        <InputField
          HtmlFor="username-siswa"
          Type="text"
          Value={username}
          Placeholder={username}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Username Siswa
          <InputRequired />
        </InputField>
        {/* PASSWORD LAMA SISWA */}
        <InputField
          HtmlFor="password-lama-siswa"
          Type="password"
          Value={passwordLama}
          Placeholder="••••••••"
          Required={true}
          OnChange={(e) => {
            setPasswordLama(e.target.value);
          }}
        >
          Password Lama
          <InputRequired />
        </InputField>
        {/* PASSWORD BARU SISWA */}
        <InputField
          HtmlFor="password"
          Type="password"
          Value={passwordBaru}
          Placeholder="••••••••"
          Required={true}
          OnChange={(e) => {
            setPasswordBaru(e.target.value);
          }}
        >
          Password Baru
          <InputRequired /> <br />
          {isShortPasswordBaru && (
            <p className="text-xs text-red-500">Password minimal 8 karakter</p>
          )}
        </InputField>
        {/* KONFIRMASI PASSWORD BARU SISWA */}
        <InputField
          HtmlFor="konfPasswordBaru"
          Type="password"
          Value={konfPasswordBaru}
          Placeholder="••••••••"
          Required={true}
          OnChange={(e) => {
            setKonfPasswordBaru(e.target.value);
          }}
        >
          Konfirmasi Password Baru
          <InputRequired /> <br />
          {!isPasswordMatch && (
            <p className="text-xs text-red-500">Password tidak baru sama</p>
          )}
        </InputField>
        {/* ROLE SISWA */}
        <InputField
          HtmlFor="role-siswa"
          Type="text"
          Value={role}
          Placeholder={role}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Role Siswa
          <InputRequired />
        </InputField>
        <div className="flex gap-2 md:gap-4 justify-end sm:justify-center">
          <Button
            Type="submit"
            ButtonStyle="PRIMARY"
            Disabled={isInputValid ? false : true}
          >
            Simpan
          </Button>
          <Button OnClick={() => cancelEditAkunSiswa()} ButtonStyle="DANGER">
            Batal
          </Button>
        </div>
      </Form>
    </div>
  );
}

EditData.propTypes = {
  AkunSiswa: PropTypes.object,
};

export default EditData;
