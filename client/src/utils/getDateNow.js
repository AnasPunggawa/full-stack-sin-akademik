export function getDateNow() {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const currentFullDate = new Date();

  const currentDate = currentFullDate.getDate(),
    currentMonth = months[currentFullDate.getMonth()],
    currentYear = currentFullDate.getFullYear();
  return `${currentDate} ${currentMonth} ${currentYear}`;
}
