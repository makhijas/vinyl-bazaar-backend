const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.post('/albums', ctrl.example.dumb);
// exports
module.exports = router