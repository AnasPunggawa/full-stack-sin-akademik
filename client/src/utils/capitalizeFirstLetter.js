export function capitalizeFirstLetter(string) {
  if (!string) return '-';
  const arrString = string.split(' ');
  const arrCapitalizeFirstLetter = arrString.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return arrCapitalizeFirstLetter.join(' ');
}
