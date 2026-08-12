let UsersModel = require('../models/users');
let jwt = require('jsonwebtoken');
let { expressjwt } = require('express-jwt');

let key = process.env.SECRETKEY;

module.exports.register = async function(req, res, next) {
    try {
        let newUser = new UsersModel(req.body);
        await newUser.save();
        
        let payload = {
            id: newUser._id,
            email: newUser.email,
            role: newUser.role
        };
        
        let token = jwt.sign(payload, key, {
            algorithm: 'HS512',
            expiresIn: "7d"
        });
        
        res.json({
            success: true,
            message: "User registered successfully",
            token: token,
            user: {
                id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports.signin = async function(req, res, next) {
    try {
        let user = await UsersModel.findOne({ "email": req.body.email });

        if (!user) {
            throw new Error("User not found with email: " + req.body.email);
        }
        
        if (!user.authenticate(req.body.password)) {
            throw new Error("Wrong username and/or password");
        }

        let payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        let token = jwt.sign(payload, key, {
            algorithm: 'HS512',
            expiresIn: "7d"
        });

        res.json({
            success: true,
            message: "User authenticated successfully",
            token: token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports.getProfile = async function(req, res, next) {
    try {
        let user = await UsersModel.findById(req.auth.id);
        
        if (!user) {
            throw new Error("User not found");
        }
        
        res.json({
            success: true,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                created: user.created,
                updated: user.updated
            }
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports.updateProfile = async function(req, res, next) {
    try {
        let user = await UsersModel.findById(req.auth.id);
        
        if (!user) {
            throw new Error("User not found");
        }
        
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        user.updated = Date.now();
        
        await user.save();
        
        res.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports.validateToken = expressjwt({
    secret: key,
    algorithms: ['HS512'],
    userProperty: 'auth'
});

module.exports.logToken = async function(req, res, next) {
    console.log("Headers:", req.headers);
    console.log("Auth:", req.auth);
    next();
};