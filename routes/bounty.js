const router = require('express').Router();
const ctrl = require('../controllers');

// routes

router.post('/', ctrl.bounty.create);

// exports
module.exports = router