const router = require('express').Router();
const ctrl = require('../controllers');

// routes

router.post('/save', ctrl.album.createAlbum)

// router.post('/save', function(req, res){
//     console.log("MADE IT TO ROUTER")
//     ctrl.album.createAlbum(req, res)
//   });

// exports
module.exports = router