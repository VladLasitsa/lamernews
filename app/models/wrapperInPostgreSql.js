var promise = require('bluebird');
var options = {
    promiseLib: promise
};
var pgp = require('pg-promise')(options);

module.exports = {

    wrapperInPostgre: function(promisePostgre, callback) {
        promisePostgre.then(function(data) {
            callback(data);
        }).catch(function(err) {
            console.log(err);
        }).finally(function() {
            pgp.end();
        });
    }
};
