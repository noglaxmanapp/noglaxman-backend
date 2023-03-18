const { Router } = require("express");
const { getAllSummary, getSummary, createSummary, updateSummary, deleteSummary, getAllSummaryOfAcount } = require('../controllers/summary.controllers');
const { checkAuth } = require("../middlewares/auth");
const { checkRoleAuth } = require("../middlewares/roleAuth");
const router = Router();

router.get('/summary', checkAuth, getAllSummary);
router.post('/summary/account', checkAuth, getAllSummaryOfAcount)
router.get('/summary/:id', checkAuth, getSummary);
router.post('/summary', checkAuth ,checkRoleAuth(['admin']), createSummary);
router.put('/summary/:id',checkAuth, checkRoleAuth(['admin']), updateSummary);
router.delete('/summary/:id',checkAuth, checkRoleAuth(['admin']), deleteSummary);

module.exports = router;