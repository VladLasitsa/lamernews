var promise = require('bluebird');
var options = {
    promiseLib: promise
};
var pgp = require('pg-promise')(options);

module.exports = {

    wrapperInPostgre: function(promisePostgre, callback, errorCallback) {
        promisePostgre.then(function(data) {
            callback(data);
        }).catch(function(err) {
            errorCallback(err);
        }).finally(function() {
            pgp.end();
        });
    }
};
