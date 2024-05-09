const User = require("../models/User");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user.length == 0) {
    bcrpyt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json(err);
      } else {
        let user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPass,
          image: req.body.image,
        });

        user
          .save()
          .then((user) => {
            if (user) {
              res.send({
                message: "User insert successfully!",
                acknowledged: true,
              });
            } else {
              res.send({ message: "User cann't inserted!" });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  } else {
    res.send({ message: "User already inserted!" });
  }
};

const imageUpload = async (req, res) => {
  console.log(url);
  const url = req?.file?.path;
  res.send({ path: url });
};
const login = async (req, res) => {
  const data = req.body;
  const userEmail = req.body.body.email;
  const userPassword = req.body.body.password;
  try {
    console.log(data)
    User.findOne({ email: userEmail }).then((user) => {
        console.log(user)
      if (user) {
        bcrpyt.compare(userPassword, user.password, function (err, result) {
          if (err) {
            res.send(err);
          }
          if (result) {
            let token = jwt.sign(
              { email: user.email },
              `${process.env.ACCESS_TOKEN}`,
              { expiresIn: "1h" }
            );
            res.send({ token: token, message: "Login successfully!" });
          } else {
            res.send({
              message: "Password doesn't match!",
            });
          }
        });
      } else {
        res.send(user);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addUser,
  imageUpload,
  login,
};
