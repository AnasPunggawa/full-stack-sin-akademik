function getDateTomorrow() {
  const dateNow = new Date();
  const dateTomorrow = new Date(dateNow);
  dateTomorrow.setDate(dateNow.getDate() + 1);
  return dateTomorrow;
}

module.exports = { getDateTomorrow };
