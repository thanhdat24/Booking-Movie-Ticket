let userList = [];
const addUser = (newUser) => (userList = [...userList, newUser]);
const removeUser = (id) =>
  (userList = userList.filter((user) => user.id !== id));
const getUserList = (showtimeId) =>
  userList.filter((user) => user.showtimeId === showtimeId);
const findUser = (id) => userList.find((user) => user.id === id);
module.exports = {
  getUserList,
  addUser,
  removeUser,
  findUser,
};
