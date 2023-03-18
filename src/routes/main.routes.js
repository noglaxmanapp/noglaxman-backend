const { Router } = require("express");
const packageJson = require("../../package.json");
const router = Router();

const getHello = () => {
  return `Wellcome to API: ${packageJson.name} v: ${packageJson.version}`;
}

router.get('/', (_, res,) => {
    res.status(200).send(getHello());
});

module.exports = router;