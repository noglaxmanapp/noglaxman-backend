const { Router } = require("express");
const { register, login } = require('../controllers/auth.controllers');
const { checkAuth } = require("../middlewares/auth");
const { checkRoleAuth } = require("../middlewares/roleAuth");
const router = Router();

router.post('/auth/register',checkAuth, checkRoleAuth(['admin']), register);
router.post('/auth/login', login);


module.exports = router;