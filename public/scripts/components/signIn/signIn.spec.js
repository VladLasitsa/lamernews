describe('testing controllerSignIn', function() {
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

    describe('hide', function() {
        it('hide must be set show in false', function() {



            var $scope = $rootScope.$new();
            var controller = $controller('controllerSignIn', {
                $scope: $scope,
                $users: mockedUsersFactory,
                usersService: mockedUserService
            });

            controller.hide();
            expect(controller.show).toBe(false);
        });
    });
    describe('signIn', function() {
        it('if login and password is no empty must be cal userFactory.signIn', function() {



            var $scope = $rootScope.$new();
            var controller = $controller('controllerSignIn', {
                $scope: $scope,
                $users: mockedUsersFactory,
                usersService: mockedUserService
            });
            controller.user = {
                useraname: "vlad",
                password: "pass"
            };
            controller.signIn();
            expect(mockedUsersFactory.signIn).toHaveBeenCalled();
        });
        it('if login or password is empty must be error in true', function() {



            var $scope = $rootScope.$new();
            var controller = $controller('controllerSignIn', {
                $scope: $scope,
                $users: mockedUsersFactory,
                usersService: mockedUserService
            });
            controller.user = {
                useraname: "",
                password: ""
            };
            controller.signIn();
            expect(controller.error).toBe(true);
            controller.user = {
                useraname: "dfdsf",
                password: ""
            };
            controller.signIn();
            expect(controller.error).toBe(true);
        });
    });


    describe('registred', function() {
        it('if login and password is no empty must be cal userFactory.createUser', function() {



            var $scope = $rootScope.$new();
            var controller = $controller('controllerSignIn', {
                $scope: $scope,
                $users: mockedUsersFactory,
                usersService: mockedUserService
            });
            controller.user = {
                useraname: "vlad",
                password: "pass"
            };
            controller.registred();
            expect(mockedUsersFactory.createUser).toHaveBeenCalled();
        });
        it('if login or password is empty must be error in true', function() {
            var $scope = $rootScope.$new();
            var controller = $controller('controllerSignIn', {
                $scope: $scope,
                $users: mockedUsersFactory,
                usersService: mockedUserService
            });
            controller.user = {
                useraname: "",
                password: ""
            };
            controller.registred();
            expect(controller.error).toBe(true);
            controller.user = {
                useraname: "dfdsf",
                password: ""
            };
            controller.registred();
            expect(controller.error).toBe(true);
        });
    });
});
