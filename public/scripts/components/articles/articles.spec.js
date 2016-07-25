
describe('testing controllerArticles', function() {
    var mockedArticlesFactory;
    var mockedUserService;
    beforeEach(module('app'));

    var $controller;
    var $rootScope;
    var $location;

    mockedArticlesFactory = jasmine.createSpyObj('$article', ['deleteArticle',
        'updateArticle', 'getArticle', 'getArticlesList', 'getRandomArticle', 'createArticle'
    ]);

    mockedUserService = jasmine.createSpyObj('usersService', ['isLogged',
        'getUser', 'setUser'
    ]);


    beforeEach(inject(function(_$rootScope_, _$location_, _$controller_) {

        $location = _$location_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
    }));

    describe('sort', function() {
        it('sort article must be call getArticlesList and this.sort equals sortType', function() {



            var $scope = $rootScope.$new();
            var controller = $controller('controllerArticles', {
                $scope: $scope,
                $articles: mockedArticlesFactory,
                usersService: mockedUserService
            });
            var sortType = 'date';
            controller.sort(sortType);
            expect(mockedArticlesFactory.getArticlesList).toHaveBeenCalled();
            expect(controller.sortType).toEqual(sortType);
        });
    });

    describe('init', function() {
        it('init controller: must be call getArticlesList', function() {


            var $scope = $rootScope.$new();
            var controller = $controller('controllerArticles', {
                $scope: $scope,
                $articles: mockedArticlesFactory,
                usersService: mockedUserService
            });

            controller.init();
            expect(mockedArticlesFactory.getArticlesList).toHaveBeenCalled();
        });
    });

    describe('randomArticle', function() {
        it('randomArticle is must be call getRandomArticle', function() {


            var $scope = $rootScope.$new();
            var controller = $controller('controllerArticles', {
                $scope: $scope,
                $articles: mockedArticlesFactory,
                usersService: mockedUserService
            });
            controller.randomArticle();
            expect(mockedArticlesFactory.getRandomArticle).toHaveBeenCalled();

        });
    });

    describe('getMoreArticle', function() {
        it('getMoreArticle must be editing parametr startIndex in 10 and call getArticlesList', function() {


            var $scope = $rootScope.$new();
            var controller = $controller('controllerArticles', {
                $scope: $scope,
                $articles: mockedArticlesFactory,
                usersService: mockedUserService
            });
            expect(controller.tempStartIndex).toBe(0);
            controller.getMoreArticle();
            expect(mockedArticlesFactory.getArticlesList).toHaveBeenCalled();
            expect(controller.tempStartIndex).toBe(10);
        });
    });
});
