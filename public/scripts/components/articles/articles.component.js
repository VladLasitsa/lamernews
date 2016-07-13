module.exports = function(app) {
    "use strict";
    var ControllerArticles = require('./controllerArticles');
    var articlesTemplate = require('./articles');
    var articlesStyle = require('../../../styles/articles.less');

    app.controller('controllerArticles', ControllerArticles);

    var config = {
        template: articlesTemplate,
        controller: 'controllerArticles',
        controllerAs: 'articlesCntr',
        css: articlesStyle
    };

    app.component('articles', config);
}
