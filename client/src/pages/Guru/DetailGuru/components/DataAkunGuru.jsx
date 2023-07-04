import PropTypes from 'prop-types';
import InputField from '../../../../components/form/InputField';
import { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { IconEye, IconEyeSlash } from '../../../../components/ui/Icons';

function DataAkunGuru({ dataAkunGuru }) {
  const { id, username, role, password } = dataAkunGuru;
  const [showPassword, setShowPassword] = useState(false);
  function handleEdit() {
    console.log('go to edit page', id);
  }
  return (
    <div className="border-b-2 border-gray-300 dark:border-gray-500">
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
          Biodata Guru
        </h3>
        <Button OnClick={() => handleEdit()} ButtonStyle="LINK_PRIMARY">
          Edit
        </Button>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* USERNAME */}
        <InputField
          HtmlFor="username-akun-guru"
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
          HtmlFor="role-akun-guru"
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
            HtmlFor="password-akun-guru"
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

DataAkunGuru.propTypes = {
  dataAkunGuru: PropTypes.object,
};

export default DataAkunGuru;
