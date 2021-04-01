//Imports 
require ('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const { JWT_SECRET } = process.env;


const db = require ('../models');

//Controllers
const test = (req,res) => { 
    res.json({ message: 'User endpoint OK!✅'})
}


//can use async and await here as well 
const register = (req, res)=> {
    //POST route - adding new user to the database
    console.log('====> Inside of /register') //console.log for every route to know that you are hitting it
    console.log('====> req.body')
    console.log(req.body) //req.body has all the user info - name, email, password

    db.User.findOne({ email: req.body.email })
    //handle the if returned user: 
    .then(user => { 
        //if email already exists, a user will come back
        if (user) { 
            //send a 400 response
            return res.status(400).json({ message: 'Email already exists' });
        } else { 
            //create a new user 
            const newUser = new db.User({ 
                name: req.body.name, 
                email: req.body.email, 
                password: req.body.password
            })

            //Salt and hash the password - password saving the user
            bcrypt.genSalt(10, (err, salt) => { 
                if (err) throw Error; //you can have throw error or even a console.log statement

                bcrypt.hash(newUser.password, salt, (err, hash) => { 
                    if (err) console.log('===> Error inside of hash')
                    //Change the password in newUser to the hash
                    newUser.password = hash;
                    newUser.save() //this saves the user to the database
                    .then(createdUser => res.json(createdUser))
                    .catch(err => console.log(err))

                })
            })
        }
    })
    .catch(err => console.log("Error finding user", err))
}

const login = async (req,res) => {
        //POST route - finding user and returning user
        console.log('====> Inside of /login') //console.log for every route to know that you are hitting it
        console.log('====> /login -> req.body')
        console.log(req.body) //req.body has all the user info - name, email, password

        const foundUser = await db.User.findOne({ email: req.body.email })
        if (foundUser) {
            // user is in the DB
            let isMatch = await bcrypt.compare(req.body.password, foundUser.password);
            //bcrypt.compare will unhash the saved password: foundUser.password 
            //and it will be compared to the user input in req.body.password

            console.log(isMatch);
            if (isMatch) {
                // if user match, then we want to send a JSON Web Token
                // Create a token payload
                // add an expiredToken = Date.now()
                // save the user
                const payload = {
                    id: foundUser.id,
                    email: foundUser.email,
                    name: foundUser.name
                }
                jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                    if (err) {
                        res.status(400).json({ message: 'Session has ended, please log in again'});
                    }
                    const legit = jwt.verify(token, JWT_SECRET, { expiresIn: 60 })
                    console.log("===> LEGIT!")
                    console.log(legit)
                    res.json({ success: true, token: `Bearer ${token}`, userData: legit })
                });
            } else {
                return res.status(400).json({ message: "Email or Password is incorrect" })
            }
        } else { 
            return res.status(400).json({ message: "User not found" })
        }

        // if (foundUser) {
        //     //user is in the DB
        //     let isMatch = await bcrypt.compare(password, foundUser.password)
        //     console.log(isMatch)
        //     //If user match, then we want to send JSON web token(jwt)
        //     //Create a token payload
        //     //add an expiredToken = Date.now()
        //     //save the user
        //     const payload = {
        //         id: foundUser.id,
        //         email: foundUser.email, 
        //         name: foundUser.name
        //     }

        //     jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        //         if (err) { 
        //             res.status(400).json({ message: "Session has ended. Please log in again"})
        //         }
        //     })
        // }
}

//private 
//req.body will be passed into profile automatically 
//this give us access to the id, name and email of the logged in user
const private = (req, res) => { 
    console.log('===> inside /profile')
    console.log(req.body)
    console.log("====> user:")
    console.log(req.user)
    const {id, name, email } = req.user //req object with user object inside
    res.json({ id, name, email }) //this short hand and is the same as res.json({ id:id, name:name, email:name })


}


//Exports
module.exports = {
    test,
    register, 
    login, 
    profile
}


