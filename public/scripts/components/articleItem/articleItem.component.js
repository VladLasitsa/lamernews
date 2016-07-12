module.exports = function(app) {
    "use strict";
    var ControllerArticle = require('./controllerArticle');
    var articleTemplate = require('./article');
    var articlesStyle = require('../../../styles/articles.less');

    app.controller('controllerArticle', ControllerArticle);

    var config = {
        template: articleTemplate,
        controller: 'controllerArticle',
        controllerAs: 'articleCntr',
        css: articlesStyle
    };

    app.component('articleitem', config);
};
