import PropTypes from 'prop-types';

function AddBiodataGuru({ User }) {
  console.log(User);
  return <div>AddBiodataGuru</div>;
}

AddBiodataGuru.propTypes = {
  User: PropTypes.object,
};

export default AddBiodataGuru;
