const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ users });
};

//Insert data
const AddUsers = async (req, res, next) => {
  let users;
  const { name, email, address, role, status, password } = req.body;

  try {
    users = new users({ name, email, address, role, status, password });
    await users.save();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).send({ message: "unable to add users" });
  }
  return res.status(200).json({ users });
};
exports.getAllUsers = getAllUsers;
exports.AddUsers = AddUsers;
