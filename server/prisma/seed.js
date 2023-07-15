const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function connectDB() {
  try {
    // Buat database jika belum ada
    // await prisma.$executeRaw('CREATE DATABASE sin-akademik-db');

    // Terhubung ke database baru
    // await prisma.$disconnect();
    await prisma.$connect();
    console.log('Database connected successfully');

    // Membuat role admin, guru, dan siswa jika belum ada
    const rolesExist = await prisma.roles.findMany();
    if (rolesExist.length === 0) {
      console.log('CREATE ROLES');
      await prisma.roles.createMany({
        data: [
          { id: 'admin', role: 'admin' },
          { id: 'guru', role: 'guru' },
          { id: 'siswa', role: 'siswa' },
        ],
      });
    }

    // Membuat user admin jika belum ada
    const usersExist = await prisma.users.findMany();
    if (usersExist.length === 0) {
      console.log('CREATE USER');
      await prisma.users.create({
        data: {
          id: 'admin',
          username: 'admin',
          password: 'admin1234',
          role: 'admin',
        },
      });
    }
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { prisma, connectDB };
