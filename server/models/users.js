let mongoose = require('mongoose');
let crypto = require('crypto');

let usersModel = mongoose.Schema( 
    {
        firstname: {
            type: String,
            required: 'First name is required',
            trim: true
        },
        lastname: String,
        email: {
            type: String, 
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        hashed_password: {
            type: String,
            required: 'Password is required',
        },
        created: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        updated: { 
            type: Date,
            default: Date.now,
            immutable: true
        }
    },
    {
        collection: "users"
    }
);

usersModel.virtual('fullName')
    .get(function() {
        return firstname + ' ' + lastname;
    })
    .set(function (fullName) {
        let splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastname = splitName[1] || '';
    }
);

usersModel.virtual('password')
    .set(function (password) {
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters.')
        }
        else {
            this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
            this.hashed_password = this.hashPassword(password);
        }
    }
);

usersModel.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
}

usersModel.methods.authenticate = function (password) {
    return this.hashed_password === this.hashPassword(password);
}

usersModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hashed_password;
        delete ret.salt;
    }
});

module.exports = mongoose.model("Users", usersModel);