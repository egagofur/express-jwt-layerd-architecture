const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUser, findEmail, insertUser } = require("./auth.repository");

const getAllUsers = async () => {
  const user = await findUser();
  return user;
};

const getEmail = async (email) => {
  const emailExist = await findEmail(email);
  return emailExist;
};

const verifyPassword = async (password, passwordHash) => {
  const isPasswordValid = bcrypt.compareSync(password, passwordHash);
  return isPasswordValid;
};

const jwtSign = (userData, secretKey) => {
  const token = jwt.sign(userData, secretKey);
  return token;
};

const createUser = async (userData) => {
  const passwordHash = bcrypt.hashSync(userData.password, 10);

  const user = await insertUser(userData, passwordHash);
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getEmail,
  verifyPassword,
  jwtSign,
};
