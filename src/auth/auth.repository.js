const prisma = require("../db");

const findUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

const findEmail = async (emailUser) => {
  const email = await prisma.user.findUnique({
    where: {
      email: emailUser,
    },
  });
  return email;
};

const insertUser = async (userData, passwordHash) => {
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: passwordHash,
    },
  });
  return user;
};

module.exports = {
  findUser,
  findEmail,
  insertUser,
};
