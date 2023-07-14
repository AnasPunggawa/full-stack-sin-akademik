import PropTypes from 'prop-types';

function EditIdentitasSekolahAdmin({ TextHeader, DataIdentitasSekolah }) {
  console.log(TextHeader);
  console.log(DataIdentitasSekolah);
  return <div>EditIdentitasSekolahAdmin</div>;
}

EditIdentitasSekolahAdmin.propTypes = {
  TextHeader: PropTypes.string,
  DataIdentitasSekolah: PropTypes.object,
};

export default EditIdentitasSekolahAdmin;
