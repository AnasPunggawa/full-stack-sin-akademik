import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import InputField from '../../../../components/form/InputField';
import { IconEye, IconEyeSlash } from '../../../../components/ui/Icons';

function AkunUserAdmin({ DataAkunUserAdmin }) {
  const { username, role, password } = DataAkunUserAdmin;
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleEdit() {
    navigate('edit-akun');
  }
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
          Data Akun Admin
        </h3>
        <Button OnClick={() => handleEdit()} ButtonStyle="LINK_PRIMARY">
          Edit
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* USERNAME */}
        <InputField
          HtmlFor="username-akun-admin"
          Type="text"
          Value={username}
          Placeholder={username}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Username Akun
        </InputField>
        {/* ROLE */}
        <InputField
          HtmlFor="role-akun-admin"
          Type="text"
          Value={role}
          Placeholder={role}
          Required={true}
          Disabled={true}
          OnChange={() => {}}
        >
          Role Akun
        </InputField>
        {/* PASSWORD */}
        <div className="w-full space-y-1 flex flex-col items-end">
          <InputField
            HtmlFor="password-akun-admin"
            Type={showPassword ? 'text' : 'password'}
            Value={password}
            Placeholder={password}
            Required={true}
            Disabled={true}
            OnChange={() => {}}
          >
            Password Akun
          </InputField>
          <Button
            ButtonStyle="LINK_PRIMARY"
            OnClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <>
                <IconEyeSlash /> Sembunyikan
              </>
            ) : (
              <>
                <IconEye /> Tampilkan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

AkunUserAdmin.propTypes = {
  DataAkunUserAdmin: PropTypes.object,
};

export default AkunUserAdmin;
