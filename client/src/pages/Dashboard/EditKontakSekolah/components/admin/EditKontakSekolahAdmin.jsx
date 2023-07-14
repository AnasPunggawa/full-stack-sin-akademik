import PropTypes from 'prop-types';

function EditKontakSekolahAdmin({ TextHeader, DataKontakSekolah }) {
  console.log(TextHeader);
  console.log(DataKontakSekolah);
  return <div>EditKontakSekolahAdmin</div>;
}

EditKontakSekolahAdmin.propTypes = {
  TextHeader: PropTypes.string,
  DataKontakSekolah: PropTypes.object,
};

export default EditKontakSekolahAdmin;
