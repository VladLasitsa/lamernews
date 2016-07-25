describe('testing UsersFactory', function() {
    beforeEach(module('app'));

    var $factory;
    var $rootScope;
    var $location;
    var $httpBackend;
    var usersService;


    beforeEach(inject(function(_$rootScope_, _$location_,$injector) {

        $location = _$location_;
        $rootScope = _$rootScope_;

        usersService = $injector.get('$users');
        $httpBackend = $injector.get('$httpBackend');

    }));

    describe('signIn', function() {
        it('signIn should send post request /api/signup', function() {

            var request = JSON.stringify({username: "vlad", password: "pass"});

            var callback = function (data) {
              $rootScope.data = data;
            };
            usersService.signIn(request, callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectPOST('/api/signup', request).respond(200, {username: "vlad"});
            $httpBackend.flush();
            expect($rootScope.data.username).toEqual("vlad");
        });
    });

    describe('getUser', function() {
        it('getUser should send get request /api/users/:username', function() {

            var username = "/vlad";

            var callback = function (data) {
              $rootScope.data = data;
            };
            usersService.getUser(username, callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectGET('/api/users'+username).respond(200, {password: "pass"});
            $httpBackend.flush();
            expect($rootScope.data.password).toEqual("pass");
        });
    });

    describe('createUser', function() {
        it('createUser should send post request /api/register', function() {

            var request = JSON.stringify({username: "vlad", password: "pass"});

            var callback = function (data) {
              $rootScope.data = data;
            };
            usersService.createUser(request, callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectPOST('/api/register', request).respond(200, {status: "ok"});
            $httpBackend.flush();
            expect($rootScope.data.status).toEqual("ok");
        });
    });

    describe('updateUser', function() {
        it('updateUser should send put request /api/users/:username', function() {

            var request = JSON.stringify({email: "vlad@gmail.com"});
            var username = "/vlad";
            var callback = function (data) {
              $rootScope.data = data;
            };
            usersService.updateUser(request,username, callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectPUT('/api/users'+ username, request).respond(200, {status: "ok"});
            $httpBackend.flush();
            expect($rootScope.data.status).toEqual("ok");
        });
    });

    describe('deleteUser', function() {
        it('deleteUser should send delete request /api/users/:username', function() {
            var username = "/vlad";
            var callback = function (data) {
              $rootScope.data = data;
            };
            usersService.deleteUser(username, callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectDELETE('/api/users'+ username).respond(200, {status: "ok"});
            $httpBackend.flush();
            expect($rootScope.data.status).toEqual("ok");
        });
    });

    describe('logout', function() {
        it('logout should send get request /api/logout', function() {
            var callback = function (data) {
              $rootScope.data = data;
            };
            usersService.logout(callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectGET('/api/logout').respond(200, {status: "ok"});
            $httpBackend.flush();
            expect($rootScope.data.status).toEqual("ok");
        });
    });

});
