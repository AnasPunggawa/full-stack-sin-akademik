const { prisma } = require('../../prisma/seed');

const CronJob = require('cron').CronJob;

async function deleteExpiredRefreshTokens() {
  try {
    // Hapus refresh token yang kadaluwarsa menggunakan Prisma query
    await prisma.refresh_token.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(), // Menghapus token yang waktu kadaluwarsanya lebih kecil dari waktu saat ini
        },
      },
    });

    // const deletedTokens = await prisma.refresh_token.deleteMany({
    //   where: {
    //     expiresAt: {
    //       lt: new Date(), // Menghapus token yang waktu kadaluwarsanya lebih kecil dari waktu saat ini
    //     },
    //   },
    // });

    // console.log(`Deleted ${deletedTokens.count} expired refresh tokens.`);
  } catch (error) {
    console.error('Failed to delete expired refresh tokens:', error);
  }
}

// const job = new CronJob(
//   // '0 0 * * *',
//   '* * * * *',
//   deleteExpiredRefreshTokens,
//   null,
//   true,
//   'Asia/Jakarta'
// );

const jobDeleteExpiredRefreshTokens = new CronJob(
  '0 0 * * *',
  // '* * * * *',
  deleteExpiredRefreshTokens,
  null,
  true,
  'Asia/Jakarta'
);

// function jobDeleteExpiredRefreshTokens() {
//   job.start();
// }

module.exports = {
  jobDeleteExpiredRefreshTokens,
};
