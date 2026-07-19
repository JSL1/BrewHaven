let UsersModel = require('../models/users');
let jwt = require('jsonwebtoken');
let { expressjst } = require('express-jwt');

let key = process.env.SECRETKEY;

module.exports.signin = async function(req, res, next) {
    try {
        console.log(req.body);
        let user = await UsersModel.findOne({ "email": req.body.email });

        if(!user) {
            throw new Error("User for " + req.body.email + " not found");
        }
        if (!user.authenticate(req.body.password)) {
            throw new Error("Wrong username and/or password");
        }

        let payload = {
            id: user._id
        }

        //generate the token
        let token = jwt.sign(payload, key. {
            algorithm: 'HS512',
            expiresIn: "20min"
        });

        //sends the token in the body of the response to the client
        res.json ({
            success: true,
            message: "User authenticated successfully",
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports.validateToken = expressjwt({
    secret: key,
    algorithms: ['HS512'],
    userProperty: 'auth'
})

module.exports.logToken = async function (req, res, next) {
    console.log(req.headers);
    console.log(req.auth);
    next();
}