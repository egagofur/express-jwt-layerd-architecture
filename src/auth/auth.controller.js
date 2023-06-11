const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  getAllUsers,
  createUser,
  getEmail,
  verifyPassword,
  jwtSign,
} = require("./auth.service");

const secretKey = process.env.SECRET_KEY;
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      message: "success get all users",
      status_code: 200,
      data: users,
    });
  } catch (error) {
    return res.status(400).send("get all users failed");
  }
});

router.post("/register", async (req, res) => {
  const auth = req.body;
  if (!(auth.name && auth.email && auth.password)) {
    return res.status(401).json({
      success: false,
      message: "data not valid",
      status_code: 401,
      data: null,
    });
  }

  try {
    const emailExist = await getEmail(auth.email);

    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "email already exist",
        status_code: 400,
        data: null,
      });
    }

    const newUser = await createUser({
      name: auth.name,
      email: auth.email,
      password: auth.password,
    });

    return res.status(201).json({
      success: true,
      message: "success create new user",
      status_code: 200,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(400).send("register failed");
  }
});

router.post("/login", async (req, res) => {
  const auth = req.body;

  if (!(auth.email && auth.password)) {
    return res.status(401).json({
      success: false,
      message: "data not valid",
      status_code: 401,
      data: null,
    });
  }

  try {
    const user = await getEmail(auth.email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "email not found",
        status_code: 401,
        data: null,
      });
    }

    const validPassword = await verifyPassword(auth.password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "password not valid",
        status_code: 401,
        data: null,
      });
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = await jwtSign(userData, secretKey);

    res.status(200).json({
      success: true,
      message: "success login",
      status_code: 200,
      data: token,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
