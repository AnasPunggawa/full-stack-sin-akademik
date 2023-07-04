const bcrypt = require('bcrypt');

function bcryptPassword(password, salt = 10) {
  return bcrypt.hashSync(password, salt);
}

async function dcryptPassword(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}

module.exports = { bcryptPassword, dcryptPassword };
