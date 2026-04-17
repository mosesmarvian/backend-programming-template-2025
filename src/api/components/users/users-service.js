const usersRepository = require('./users-repository');
const gachaRepository = require('../gacha/gacha-repository');

async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName) {
  const newUser = await usersRepository.createUser(email, password, fullName);

  if (newUser) {
    await gachaRepository.createUserGacha(newUser.id, newUser.fullName);
  }
  return newUser;
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function changePassword(id, password) {
  return usersRepository.changePassword(id, password);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
