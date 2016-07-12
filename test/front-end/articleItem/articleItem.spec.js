
describe('testing controllerArticle', function() {
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

    describe('updateArticle', function() {
        it('update article must be call updateArticle', function() {



            var $scope = $rootScope.$new();
            var controller = $controller('controllerArticle', {
                $scope: $scope,
                $articles: mockedArticlesFactory,
                usersService: mockedUserService
            });

            controller.updateArticle();
            expect(mockedArticlesFactory.updateArticle).toHaveBeenCalled();
        });
    });

    describe('init', function() {
        it('init controller: must be call getArticle', function() {


            var $scope = $rootScope.$new();
            var controller = $controller('controllerArticle', {
                $scope: $scope,
                $articles: mockedArticlesFactory,
                usersService: mockedUserService
            });

            controller.init();
            expect(mockedArticlesFactory.getArticle).toHaveBeenCalled();
        });
    });

    describe('submit comment', function() {
        it('if comment is not null must be call updateArticle', function() {


            var $scope = $rootScope.$new();
            var controller = $controller('controllerArticle', {
                $scope: $scope,
                $articles: mockedArticlesFactory,
                usersService: mockedUserService
            });
            controller.comment = "hello"
            controller.submitComment();
            expect(mockedArticlesFactory.updateArticle).toHaveBeenCalled();
            expect(controller.comment).toEqual('');
        });
        it('if comment is null must be error', function() {


            var $scope = $rootScope.$new();
            var controller = $controller('controllerArticle', {
                $scope: $scope,
                $articles: mockedArticlesFactory,
                usersService: mockedUserService
            });
            controller.comment = ""
            controller.submitComment();
            expect(controller.error).toEqual('Нет данных');
        });
    });

    describe('incrementRating', function() {
        it('incrementRating must be call updateArticle and set checkRating in false', function() {


            var $scope = $rootScope.$new();
            var controller = $controller('controllerArticle', {
                $scope: $scope,
                $articles: mockedArticlesFactory,
                usersService: mockedUserService
            });

            controller.incrementRating();
            expect(mockedArticlesFactory.updateArticle).toHaveBeenCalled();
            expect(controller.checkRating).toBe(false);
        });
    });


});
