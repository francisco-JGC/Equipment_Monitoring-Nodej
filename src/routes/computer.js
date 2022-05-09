const router = require('express').Router();
const controller = require('../controllers/computer.controller')

router.get('/', controller.Home)

router.post('/monitoring', controller.Monitoring)

module.exports = router