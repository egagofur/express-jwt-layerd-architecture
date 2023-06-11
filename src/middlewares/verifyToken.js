const jwt = require("jsonwebtoken");
const prisma = require("../db");
const secretKey = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
      status_code: 403,
      data: null,
    });
  }
  const token = authHeader.split(" ").pop();

  try {
    const data = jwt.verify(token, secretKey);

    const user = prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
        status_code: 401,
        data: null,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
      status_code: 401,
      data: null,
    });
  }
};

module.exports = verifyToken;
