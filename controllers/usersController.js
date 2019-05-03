const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const config = require('../common/configs');

const { emailExist, userNotFound, passwordIncorrect } = require('../common/errorMessage');

const registerUser = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    res.status(emailExist.code);
    res.json(emailExist);
  } else {
    const { name, email, password } = req.body;

    const avatar = gravatar.url(email, {
      s: '200', // size
      r: 'pg', // rating
      d: 'mm' // default
    });

    const salt = await bcrypt.genSalt(parseInt(config.SALT_LENGTH));
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
      avatar
    });
    const savedUser = await newUser.save();
    const userClient = savedUser.toObject();
    delete userClient.password;

    res.status(201);
    res.json(userClient);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(userNotFound.code);
    return res.json(userNotFound);
  }

  // password
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    res.status(passwordIncorrect.code);
    return res.json(passwordIncorrect);
  }
  // matched
  // sign token
  const payload = { id: user.id, name: user.name, avatar: user.avatar };
  const token = jwt.sign(payload, config.SECRET_KEY, {
    expiresIn: parseInt(config.TOKEN_EXPIRE)
  });
  res.json({ token });
};
module.exports = {
  registerUser,
  loginUser
};
