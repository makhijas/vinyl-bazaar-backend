const { default: axios } = require('axios');
const db = require('../models');

const createAlbum = async ( req, res ) => {

    console.log("create album!");

    db.Album.create({
        title: req.body.album.title,
        AlbumId: req.body.album.id,
        image_url: req.body.album.thumb, 
        date: Date.now()
        })
            
    res.json({ message: "Endpoint Valid: Saved Album" });
    
    
}

module.exports = {
    createAlbum
  }

