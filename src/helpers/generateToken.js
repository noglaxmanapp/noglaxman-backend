const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
  return jwt.sign({
    client_id: user.client_id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "5h"
  }
  )
}

const verifyToken = async(token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null
  }
}

module.exports = { tokenSign, verifyToken }