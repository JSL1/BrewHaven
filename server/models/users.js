let mongoose = require('mongoose');
let crypto = require('crypto');

let usersModel = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: 'First name is required',
            trim: true
        },
        lastname: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: 'Email is required',
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        hashed_password: {
            type: String,
            required: 'Password is required'
        },
        salt: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        created: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        updated: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

usersModel.virtual('fullName')
    .get(function() {
        return this.firstname + ' ' + this.lastname;
    })
    .set(function(fullName) {
        let splitName = fullName.split(' ');
        this.firstname = splitName[0] || '';
        this.lastname = splitName[1] || '';
    });

usersModel.virtual('password')
    .set(function(password) {
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters.');
        } else {
            this.salt = crypto.randomBytes(16).toString('base64');
            this.hashed_password = this.hashPassword(password);
        }
    });

usersModel.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

usersModel.methods.authenticate = function(password) {
    return this.hashed_password === this.hashPassword(password);
};

usersModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.hashed_password;
        delete ret.salt;
    }
});

module.exports = mongoose.model("Users", usersModel);