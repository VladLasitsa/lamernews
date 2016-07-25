module.exports = function(app) {
    "use strict";
    var ControllerHeader = require('./controllerHeader');
    var headerTemplate = require('./header');
    var headerStyle = require('./header.less');

    app.controller('controllerHeader', ControllerHeader);

    var config = {
        template: headerTemplate,
        controller: 'controllerHeader',
        controllerAs: 'headerCntr',
        css: headerStyle
    };

    app.component('header', config);
};
