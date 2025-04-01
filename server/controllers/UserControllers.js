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
  console.log("res", req.body);
  let users;
  const { name, email, address, phoneno, /*  role, status, */ password } =
    req.body;

  try {
    users = new User({ name, email, address, phoneno, password });
    await users.save();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).send({ message: "unable to add users" });
  }
  return res.status(200).json({ users });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let users;
  try {
    users = await User.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).send({ message: "unable to user" });
  }
  return res.status(200).json({ users });
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  console.log("id:", id);
  const { name, address, phoneno } = req.body;
  let users;

  try {
    users = await User.findByIdAndUpdate(id, {
      name: name,
      address: address,
      phoneno: phoneno,
    });
    users = await users.save();
  } catch (err) {
    if (!users) {
      return res.status(404).send({ message: "unable to user" });
    }
    return res.status(200).json({ users });
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let users;
  try {
    users = await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).send({ message: "unable to user" });
  }
  return res.status(200).json({ users });
};
exports.getAllUsers = getAllUsers;
exports.AddUsers = AddUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

/////Login
// const Login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     console.log("user:", user);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ status: "error", message: "User not found" });
//     }

//     if (user.password === password) {
//       console.log("drrddtd");
//       return res.json({ status: "ok", message: "Login successful" });
//     } else {
//       console.log("else:");
//       return res
//         .status(401)
//         .json({ status: "error", message: "Invalid credentials" });
//     }
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ status: "error", message: "Internal server error" });
//   }
// };
// // Removed the extra closing parenthesis
// exports.Login = Login;
