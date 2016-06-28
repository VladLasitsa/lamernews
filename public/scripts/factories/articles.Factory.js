module.exports = function() {
    'use strict';
    return {


        getArticlesList: function(startIndex, count, typeSort, callback) {
            fetch('/api/articles/' + startIndex + '/' +
                    count + '?sort=' + typeSort)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    callback(json);
                })
                .catch(function(error) {
                    console.log('Request failed', error);
                });
        },

        getArticle: function(link, callback) {
            fetch(`/api${link}`)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    callback(json);
                })
                .catch(function(error) {
                    console.log('Request failed', error);
                });
        },

        getRandomArticle: function(callback) {
            fetch('/api/articles/random')
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    callback(json);
                })
                .catch(function(error) {
                    console.log('Request failed', error);
                });
        },

        createArticle: function(request, callback) {
            fetch('/api/articles', {
                    method: 'POST',
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

        updateArticle: function(request, link, callback) {
            fetch(`/api${link}`, {
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

        deleteArticle: function(link, callback) {
            fetch(`/api${link}`, {
                    method: 'DELETE',
                    credentials: 'include',
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
