module.exports = function($http) {
    'use strict';
    return {

        signIn: function(request, callback) {
            $http.post('/api/signup', request, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                withCredentials: true
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });

        },

        getUser: function(username, callback) {
            $http.get('/api/users' + username, {
                withCredentials: true
            }).then(function(response) {
                callback(response.data);
            }, function(response) {

            });
        },

        createUser: function(request, callback) {
            $http.post('/api/register', request, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                withCredentials: true
            }).then(function(response) {
                callback(response);
            }, function(response) {
              callback(response);
            });
        },

        updateUser: function(request, username, callback) {
            $http.put('/api/users' + username, request, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                withCredentials: true
            }).then(function(response) {
                callback(response.data);
            }, function(response) {

            });
        },

        logout: function(callback) {
            $http.get('/api/logout', {
                withCredentials: true
            }).then(function(response) {
                callback(response.data);
            }, function(response) {

            });
        },

        deleteUser: function(username, callback) {
            $http.delete('/api/users' + username, {
                withCredentials: true
            }).then(function(response) {
                callback(response.data);
            }, function(response) {

            });
        }
    };
};
