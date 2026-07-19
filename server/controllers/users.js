let UsersModel = require('../models/users');

module.exports.add = async function (req, res, next) {
    try {
        let newUser = UsersModel(req.body);
        let result = await UsersModel.create(newUser);

        res.json({
            success: true,
            message: "User added successfully.",
            data: result
        });


    } catch (err) {
        console.log(err);
        next(err);
    }
}