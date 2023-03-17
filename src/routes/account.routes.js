const { Router } = require("express");
const { getAllAccount, getAccount, createAccount, updateAccount, deleteAccount, getAllAcountOfClient } = require('../controllers/account.controllers');
const { checkAuth } = require("../middlewares/auth");
const { checkRoleAuth } = require("../middlewares/roleAuth");
const router = Router();

router.get('/account', checkAuth, getAllAccount);
router.get('/account/:id', checkAuth, getAccount);
router.post("/client/accounts",checkAuth, getAllAcountOfClient);
router.post('/account',checkAuth, checkRoleAuth(['admin']), createAccount);
router.put('/account/:id', checkAuth, checkRoleAuth(['admin']),updateAccount);
router.delete('/account/:id', checkAuth, checkRoleAuth(['admin']),deleteAccount);

module.exports = router;