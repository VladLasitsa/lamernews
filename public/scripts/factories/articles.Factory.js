module.exports = function($http, $location) {
    'use strict';
    return {

        getArticlesList: function(startIndex, count, typeSort, callback) {
            $http.get('/api/articles/' + startIndex + '/' +
                    count + '?sort=' + typeSort)
                .then(function(response) {
                    callback(response.data);
                }, function(response) {});
        },

        getArticle: function(callback) {
            $http.get(`/api` + $location.path()).then(function(response) {
                callback(response.data);
            }, function(response) {

            });
        },

        getRandomArticle: function(callback) {
            $http.get(`/api/articles/random`).then(function(response) {
                callback(response.data);
            }, function(response) {

            });
        },

        createArticle: function(request, callback) {
            $http.post('/api/articles', request, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                withCredentials: true
            }).then(function(response) {
                callback(response.data);
            }, function(response) {

            });
        },

        updateArticle: function(request, callback) {
            $http.put('/api' + $location.path(), request, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                withCredentials: true
            }).then(function(response) {
                callback(response.data);
            }, function(response) {

            });
        },

        deleteArticle: function(callback) {
            $http.delete('/api' + $location.path(), {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                withCredentials: true
            }).then(function(response) {
                callback(response.data);
            }, function(response) {

            });
        }
    };
};
