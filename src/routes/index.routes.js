const { Router } = require('express');
const router = Router();
const {renderIndex} = require('../controllers/index.ctrls')

router.get('/', renderIndex)

module.exports = router