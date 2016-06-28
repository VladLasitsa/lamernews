module.exports = function() {
    var user = '';
    var auth = false;
    var usersRating = [];

    this.setUserRating = function(id) {
        usersRating.push(id);
    };

    this.rating = function(id) {
        var check = true;
        usersRating.forEach(function(item, index) {
          console.log(item+",  "+ id);
            if (item === id) {
                check = false;
            }
        });
        if (check) {
            return true;
        } else {
            return false;
        }

    };

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
}
