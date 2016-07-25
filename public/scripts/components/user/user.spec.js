describe('testing controllerUser', function() {
    var mockedUsersFactory;
    var mockedUserService;
    var mockedArticlesFactory;
    beforeEach(module('app'));

    var $controller;
    var $rootScope;
    var $location;

    mockedUsersFactory = jasmine.createSpyObj('$users', ['signIn',
        'updateUser', 'getUser', 'createUser', 'deleteUser', 'logout'
    ]);

    mockedUserService = jasmine.createSpyObj('usersService', ['isLogged',
        'getUser', 'setUser', 'logged'
    ]);

    mockedArticlesFactory = jasmine.createSpyObj('$article', ['deleteArticle',
        'updateArticle', 'getArticle', 'getArticlesList', 'getRandomArticle', 'createArticle'
    ]);


    beforeEach(inject(function(_$rootScope_, _$location_, _$controller_) {

        $location = _$location_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
    }));

    describe('showUpdateBlock', function() {
        it('showUpdateBlock must be set update and hide in true', function() {
            var $scope = $rootScope.$new();
            var controller = $controller('controllerUser', {
                $scope: $scope,
                $users: mockedUsersFactory,
                usersService: mockedUserService
            });

            controller.showUpdateBlock();
            expect(controller.update).toBe(true);
            expect(controller.hide).toBe(true);
        });
    });
    describe('hideUpdateBlock', function() {
        it('hideUpdateBlock must be set update and hide in false', function() {

            var $scope = $rootScope.$new();
            var controller = $controller('controllerUser', {
                $scope: $scope,
                $users: mockedUsersFactory,
                usersService: mockedUserService
            });

            controller.hideUpdateBlock();
            expect(controller.update).toBe(false);
            expect(controller.hide).toBe(false);
        });
    });


    describe('updateUser', function() {
        it('if email is not null must be call userFactory.updateUser', function() {

            var $scope = $rootScope.$new();
            var controller = $controller('controllerUser', {
                $scope: $scope,
                $users: mockedUsersFactory,
                $article: mockedArticlesFactory,
                usersService: mockedUserService
            });
            controller.email = 'vlad';
            controller.updateUser();
            expect(mockedUsersFactory.updateUser).toHaveBeenCalled();
        });
        it('if email is null must be set error true', function() {

            var $scope = $rootScope.$new();
            var controller = $controller('controllerUser', {
                $scope: $scope,
                $users: mockedUsersFactory,
                $article: mockedArticlesFactory,
                usersService: mockedUserService
            });
            controller.email = '';
            controller.updateUser();
            expect(controller.error).toBe(true);
        });
    });

    describe('createArticle', function() {
        it('if title and content article is not null ' +
            'must be call articleFactory.createArticle',
            function() {

                var $scope = $rootScope.$new();
                var controller = $controller('controllerUser', {
                    $scope: $scope,
                    $users: mockedUsersFactory,
                    $articles: mockedArticlesFactory,
                    usersService: mockedUserService
                });
                controller.titleArticle = "vlad";
                controller.contentArticle = "vlad";
                controller.createArticle();
                expect(mockedArticlesFactory.createArticle).toHaveBeenCalled();
            });
        it('if title or content article is null ' +
            'must be set error is true',
            function() {

                var $scope = $rootScope.$new();
                var controller = $controller('controllerUser', {
                    $scope: $scope,
                    $users: mockedUsersFactory,
                    $articles: mockedArticlesFactory,
                    usersService: mockedUserService
                });
                controller.titleArticle = "";
                controller.contentArticle = "vlad";
                controller.createArticle();
                expect(controller.error).toBe(true);

                controller.titleArticle = "";
                controller.contentArticle = "";
                controller.createArticle();
                expect(controller.error).toBe(true);

                controller.titleArticle = "vlad";
                controller.contentArticle = "";
                controller.createArticle();
                expect(controller.error).toBe(true);
            });
    });
});
