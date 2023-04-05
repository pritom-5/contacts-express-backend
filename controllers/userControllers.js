const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModels");

//@desc POST register user
//@route POST /users/register
//@access public
// username, email, password
const registerUser = asyncHandler(async (req, res) => {
  ///////////
  console.log(req.body);
  const { username, email, password } = req.body;

  // check if any field was empty submitted
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Every field is mandetory");
  }

  // check if user already registered with same email
  const userAvailable = await userModel.findOne({ email });
  if (!!userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ id: createdUser._id, email: createdUser.email });
});

//----------------------------------------------
//@desc POST login user
//@route POST /users/login
//@access public
// username, password
const loginUser = asyncHandler(async (req, res) => {
  // get username password from body
  const { username, password } = req.body;

  // check if username and password both passed
  if (!username || !password) {
    res.status(400);
    throw new Error("Both username and password needed");
  }

  // get user from db with username
  const user = await userModel.findOne({ username });

  // check if passoword is valid and user exists
  if (!!user && (await bcrypt.compare(password, user.password))) {
    const webtoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.SECRET_KEY
    );

    res.status(200);
    res.json({ accessToken: webtoken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//-----------------------------------------------
//@desc GET current user
//@route GET /users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  res.json({ message: "user details" });
});

module.exports = { registerUser, loginUser, currentUser };
