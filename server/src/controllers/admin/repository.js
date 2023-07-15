// const prisma = require('../../../prisma/seed');
const { prisma } = require('../../../prisma/seed');

async function find_all_datas() {
  return await prisma.admin.findMany();
}

async function find_single_data(id) {
  await prisma.admin.findUnique({
    where: {
      id,
    },
  });
}

async function find_details_single_data(id) {
  return await prisma.admin.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      user_id: true,
      nama: true,
      jenisKelamin: true,
      tempatLahir: true,
      tanggalLahir: true,
      alamat: true,
      email: true,
      nomorHP: true,
      users: {
        select: {
          id: true,
          username: true,
          password: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

async function create_data(data) {
  return await prisma.admin.create({
    data,
  });
}

async function update_data(id, data) {
  return await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
}

async function delete_data(id) {
  return await prisma.admin.delete({
    where: {
      id,
    },
  });
}

async function check_admin_id(id) {
  return await prisma.admin.findUnique({
    where: {
      id,
    },
  });
}

async function check_user_id(user_id) {
  return await prisma.users.findUnique({
    where: {
      id: user_id,
    },
  });
}

async function check_admin_has_user_id(user_id) {
  return await prisma.admin.findUnique({
    where: {
      user_id,
    },
    include: {
      users: true,
    },
  });
}

async function check_email(email) {
  return await prisma.admin.findUnique({
    where: {
      email,
    },
  });
}

module.exports = {
  find_all_datas,
  find_single_data,
  find_details_single_data,
  create_data,
  update_data,
  delete_data,
  check_admin_id,
  check_user_id,
  check_admin_has_user_id,
  check_email,
};
