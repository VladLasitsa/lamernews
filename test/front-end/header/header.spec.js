
describe('testing controllerHeader', function() {
    var mockedUsersFactory;
    var mockedUserService;
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


    beforeEach(inject(function(_$rootScope_, _$location_, _$controller_) {

        $location = _$location_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
    }));

    describe('logout', function() {
        it('logout must be call UsersFactory.logout', function() {



            var $scope = $rootScope.$new();
            var controller = $controller('controllerHeader', {
                $scope: $scope,
                $users: mockedUsersFactory,
                usersService: mockedUserService
            });

            controller.logout();
            expect(mockedUsersFactory.logout).toHaveBeenCalled();
        });
    });
    describe('changeLang', function() {
        it('changeLang must be set $rootScope.locale', function() {



            var $scope = $rootScope.$new();
            var controller = $controller('controllerHeader', {
                $scope: $scope,
                $users: mockedUsersFactory,
                usersService: mockedUserService
            });

            controller.changeLang("RU");
            expect($rootScope.locale).toEqual("RU");
        });
    });

});
