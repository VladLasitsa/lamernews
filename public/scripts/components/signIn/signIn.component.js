module.exports = function(app) {
    "use strict";
    var ControllerSignIn = require('./controllerSignIn');
    var signInTemplate = require('./signIn');
    var signInStyle = require('../../../styles/signIn.less');

    app.controller('controllerSignIn', ControllerSignIn);

    var config = {
        template: signInTemplate,
        controller: 'controllerSignIn',
        controllerAs: 'signInCntr',
        css: signInStyle
    };

    app.component('signin', config);

};
