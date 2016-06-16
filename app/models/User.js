var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var db = mongoose.createConnection('mongodb://localhost/users');

db.on('error', console.error);
db.once('open', function() {});


var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    registrationDate: Date,
    commentCount: Number,
    articleCount: Number
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = db.model("User", UserSchema);

module.exports = User;
