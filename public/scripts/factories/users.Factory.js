module.exports = function($http) {
    'use strict';
    return {

        signIn: function(request, callback) {
            fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    credentials: 'include',
                    body: request
                })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    callback(json);
                })
                .catch(function(error) {
                    console.log('Request failed', error);
                });

        },

        getUser: function(username, callback) {
            fetch('/api/users' + username, {
                    credentials: 'include'
                })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    callback(json);
                })
                .catch(function(error) {
                    console.log('Request failed', error);
                });
        },

        createUser: function(request, callback) {
            fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    credentials: 'include',
                    body: request
                })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    callback(json);
                })
                .catch(function(error) {
                    console.log('Request failed', error);
                });
        },

        updateUser: function(request, username, callback) {
            fetch('/api/users' + username, {
                    method: 'PUT',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    credentials: 'include',
                    body: request
                })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    callback(json);
                })
                .catch(function(error) {
                    console.log('Request failed', error);
                });
        },

        logout : function (callback) {
          fetch('/api/logout', {
                  credentials: 'include'
              })
              .then(function(response) {
                  return response.json();
              }).then(function(json) {
                  callback(json);
              })
              .catch(function(error) {
                  console.log('Request failed', error);
              });
        },

        deleteUser: function(username, callback) {
            fetch('/api/users' + username, {
                    method: 'DELETE',
                    credentials: 'include'
                })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    callback(json);
                })
                .catch(function(error) {
                    console.log('Request failed', error);
                });
        }
    };
};
