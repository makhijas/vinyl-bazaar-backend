const { default: axios } = require('axios');
const db = require('../models');

const create = (req, res) => {
    // Purpose: Create one example by adding body to DB, and return
    console.log('=====> Inside POST /bounty');
    console.log('=====> req.body');
    console.log(req.body); // object used for creating new example
    console.log("====> REQ.PARAMs" + Object.keys(req.params)[0])

    console.dir("***USER ID from PARAMS" + req.params)
    db.Bounty.create({
        userId: req.params.userId,
        albumId: req.params.albumId, 
        amount: req.body.bounty
    }).then((err, savedBounty) => {
        console.log("******REQ.PARAMS******" +  req.params)
        if (err) console.log('Error in bounty#create:', err);
        
        // res.json(savedBounty);
    });
    
};

// const dumb = (req, res) => {
//     // Purpose: Fetch one example from DB and return
//     //let searchTerm = req.body.
//     console.log(req.body)
//     let searchTerm = req.body.term
//     let secret = process.env.APISECRETKEY
//     let discogsUrl = "https://api.discogs.com/database/search?release_title=" + searchTerm + "&key=tyUsvIrblYOpTSJKlFiz&secret=" + secret;
//     axios.get(discogsUrl).then(discogsResponse => {
//         console.log("****DATA FROM BACKEND****")
//         console.log(discogsResponse.data);
//         res.send(discogsResponse.data);
//     })
// };

module.exports = {
    
    create,

};

