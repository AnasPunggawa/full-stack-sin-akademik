const prisma = require('../../../prisma/seed');

async function find_user_id(id) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
}

async function find_username(username) {
  return await prisma.users.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      password: true,
      role: true,
    },
  });
}

async function insert_refresh_token(data) {
  return await prisma.refresh_token.create({
    data,
  });
}

async function find_refresh_token_user_id(user_id) {
  return await prisma.refresh_token.findUnique({
    where: {
      user_id,
    },
  });
}

async function find_refresh_token(refreshToken) {
  return await prisma.refresh_token.findFirst({
    where: {
      refreshToken,
    },
  });
}

async function delete_refresh_token(user_id) {
  return await prisma.refresh_token.delete({
    where: {
      user_id,
    },
    select: {
      user_id: true,
    },
  });
}

module.exports = {
  find_user_id,
  find_username,
  insert_refresh_token,
  find_refresh_token_user_id,
  find_refresh_token,
  delete_refresh_token,
};
