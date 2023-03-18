const { verifyToken } = require("../helpers/generateToken");

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    if ([].concat(roles).includes(tokenData.role)) {
      next();
    } else {
      res.status(409);
      res.send({error: "Permisos no autorizados"})
    }
  } catch (error) {
    console.log(error);
    res.status(409);
    res.send({error: "Permisos no autorizados."});
  }
}

module.exports = { checkRoleAuth };