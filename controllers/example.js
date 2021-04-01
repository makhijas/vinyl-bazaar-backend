const { default: axios } = require('axios');
const db = require('../models');

const index = (req, res) => {
    // Purpose: Fetch all examples from DB and return
    console.log('=====> Inside GET /examples');

    db.Example.find({}, (err, foundExamples) => {
        if (err) console.log('Error in example#index:', err);
        res.json(foundExamples);
    });
}

const show = (req, res) => {
    // Purpose: Fetch one example from DB and return
    console.log('=====> Inside GET /examples/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding example by id

    db.Example.findById(req.params.id, (err, foundExample) => {
        if (err) console.log('Error in example#show:', err);
        res.json(foundExample);
    });
};


const dumb = (req, res) => {
    // Purpose: Fetch one example from DB and return
    //let searchTerm = req.body.
    console.log(req.body)
    let searchTerm = req.body.term
    let discogsUrl = "https://api.discogs.com/database/search?release_title=" + searchTerm + "&key=tyUsvIrblYOpTSJKlFiz&secret=dvbIgifMTdHKdtQFwLIYdHZltjfQvyCw";
    axios.get(discogsUrl).then(discogsResponse => {
        console.log(discogsResponse.data);
        res.send(discogsResponse.data);
    })
};

const create = (req, res) => {
    // Purpose: Create one example by adding body to DB, and return
    console.log('=====> Inside POST /examples');
    console.log('=====> req.body');
    console.log(req.body); // object used for creating new example

    db.Example.create(req.body, (err, savedExample) => {
        if (err) console.log('Error in example#create:', err);
        res.json(savedExample);
    });
};

const update = (req, res) => {
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside PUT /examples/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding example by id
    console.log('=====> req.body');
    console.log(req.body); // object used for updating example

    db.Example.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedExample) => {
        if (err) console.log('Error in example#update:', err);
        res.json(updatedExample);
    });
};

const destroy = (req, res) => {
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside DELETE /examples/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding example by id
    
    db.Example.findByIdAndDelete(req.params.id, (err, deletedExample) => {
        if (err) console.log('Error in example#destroy:', err);
          res.sendStatus(200);
          console.log(deletedExample);
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    dumb
};

