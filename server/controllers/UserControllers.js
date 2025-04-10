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

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only JPEG, PNG, and JPG files are allowed"), false);
//   }
// };

const handleUpdatePicture = async (req, res) => {
  try {
    console.log("req1:> ", req.files.profilePicture);
    console.log("req2:> ", req.body.userID);
    const userID = req.body.userID;
    // Check if file exists
    if (!req.files) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Find the user by ID from the token
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's profile picture path

    const profileImg = req.files.profilePicture;
    const profileImageName = new Date().getTime();
    await profileImg.mv(
      "Assets/profilePicture/" + `${profileImageName}.jpg`,
      (err) => {}
    );

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { profileImage: `${profileImageName}.jpg` },
      { new: true }
    );

    // Send success response
    res.status(200).json({
      message: "Profile picture updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.error("Profile picture update error:", error);
    res.status(500).json({
      message: "Error updating profile picture",
      error: error.message,
    });
  }
};

exports.handleUpdatePicture = handleUpdatePicture;
