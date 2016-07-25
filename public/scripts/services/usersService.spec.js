describe('testing UsersService', function() {
    beforeEach(module('app'));

    var $factory;
    var $rootScope;
    var $location;
    var usersService;


    beforeEach(inject(function(_$rootScope_, _$location_,$injector) {

        $location = _$location_;
        $rootScope = _$rootScope_;

        usersService = $injector.get('usersService');

    }));

    describe('getUser', function() {
        it('getUser should return user name', function() {
            var setUsername = "vlad";
            usersService.setUser(setUsername);
            var username = usersService.getUser();

            expect(username).toEqual(setUsername);
        });
    });

    describe('setUser', function() {
        it('setUser should return user name equal set "dima"', function() {
            var setUsername = "dima";
            usersService.setUser(setUsername);
            var username = usersService.getUser();

            expect(username).toEqual(setUsername);
        });
    });

    describe('isLogged', function() {
        it('setUser should return true if user is set', function() {
            var bool = true;
            usersService.logged(bool);
            var log = usersService.isLogged();

            expect(log).toEqual(bool);
        });
    });
});
