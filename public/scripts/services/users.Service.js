module.exports = function() {
    var user = '';
    var auth = false;

    this.setUser = function(username) {
        user = username;
    };

    this.getUser = function() {
        return user;
    };

    this.logged = function(bool) {
        auth = bool;
    };

    this.isLogged = function() {
        return auth;
    };
};
