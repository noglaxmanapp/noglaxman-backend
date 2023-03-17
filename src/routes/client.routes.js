const { Router } = require("express");
const { getAllClient, getClient, updateClient, deleteClient, getRole } = require('../controllers/client.controllers');
const { checkAuth } = require("../middlewares/auth");
const { checkRoleAuth } = require("../middlewares/roleAuth");
const router = Router();

router.get('/client', checkAuth, checkRoleAuth(['admin']), getAllClient);
router.get('/client/:id', checkAuth, checkRoleAuth(['admin']), getClient);
router.put('/client/:id', checkAuth, checkRoleAuth(['admin']), updateClient);
router.delete('/client/:id', checkAuth, checkRoleAuth(['admin']), deleteClient);
router.post('/client/role', checkAuth, getRole)

module.exports = router;
