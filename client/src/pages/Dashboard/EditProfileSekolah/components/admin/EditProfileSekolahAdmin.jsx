import PropTypes from 'prop-types';

function EditProfileSekolahAdmin({ TextHeader, DataProfilSekolah }) {
  console.log(TextHeader);
  console.log(DataProfilSekolah);
  return <div>EditProfileSekolahAdmin</div>;
}

EditProfileSekolahAdmin.propTypes = {
  TextHeader: PropTypes.string,
  DataProfilSekolah: PropTypes.object,
};

export default EditProfileSekolahAdmin;
