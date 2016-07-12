module.exports = function(app) {
    "use strict";
    var ControllerUser = require('./controllerUser');
    var userTemplate = require('./user');
    var userStyle = require('../../../styles/user.less');

    app.controller('controllerUser', ControllerUser);

    var config = {
        template: userTemplate,
        controller: 'controllerUser',
        controllerAs: 'userCntr',
        css: userStyle
    };

    app.component('user', config);
};
