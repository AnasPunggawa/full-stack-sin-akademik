function getCurrentDate() {
  const dateTime = new Date();

  const hari = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    "Jum'at",
    'Sabtu',
  ];
  const bulan = [
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

  const currentDay = hari[dateTime.getDay()],
    currentDate = dateTime.getDate(),
    currentMonth = bulan[dateTime.getMonth()],
    currentYear = dateTime.getFullYear(),
    currentHour = dateTime.getHours(),
    currentMinute = dateTime.getMinutes(),
    currentSecond = dateTime.getSeconds();

  return `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}, ${currentHour}:${currentMinute}:${currentSecond}`;
}

module.exports = { getCurrentDate };
