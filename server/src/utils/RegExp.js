function containsWhitespace(str) {
  return /\s/.test(str);
}

function containsOnlyNumbers(str) {
  if (str === '' || str === null || str === undefined) return true;
  return /^\d+$/.test(str);
}

function containsOnlyString(str) {
  return /^[A-Za-z\s]*$/.test(str);
}

function validateEmail(email) {
  const str = email.toLowerCase();
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    str
  );
}

function validateGanjilGenap(semester) {
  const semesterLC = semester.toLowerCase(),
    regGanjil = /ganjil/,
    regGenap = /genap/;
  return regGanjil.test(semesterLC) || regGenap.test(semesterLC);
}

module.exports = {
  containsWhitespace,
  containsOnlyNumbers,
  containsOnlyString,
  validateEmail,
  validateGanjilGenap,
};
