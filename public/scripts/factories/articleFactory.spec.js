describe('testing ArticlesFactory', function() {
    beforeEach(module('app'));

    var $factory;
    var $rootScope;
    var $location;
    var $httpBackend;
    var usersService;


    beforeEach(inject(function(_$rootScope_, _$location_, $injector) {

        $location = _$location_;
        $rootScope = _$rootScope_;

        articlesService = $injector.get('$articles');
        $httpBackend = $injector.get('$httpBackend');

    }));

    describe('getArticlesList', function() {
        it('getArticlesList should send post request /api/articles/:startIndex/:count/?sort=sortType',
            function() {

                var count = 0;
                var startIndex = 10;
                var sortType = 'date';
                var callback = function(data) {
                    $rootScope.data = data;
                };
                articlesService.getArticlesList(startIndex
                  , count, sortType, callback);
                $httpBackend.expectGET('resource/en.json').respond(200);
                $httpBackend.expectGET('/api/articles/'+
                startIndex +'/'+count+ '?sort='+sortType).respond(200, {
                    username: "vlad"
                });
                $httpBackend.flush();
                expect($rootScope.data.username).toEqual("vlad");
            });
    });

    describe('getArticle', function() {
        it('getArticle should send get request /api/articles/:id', function() {

            $location.path('/articles/1')

            var callback = function(data) {
                $rootScope.data = data;
            };
            articlesService.getArticle(callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectGET('/api/articles/1').respond(200, {
                password: "pass"
            });
            $httpBackend.flush();
            expect($rootScope.data.password).toEqual("pass");
        });
    });

    describe('createArticle', function() {
        it('createArticle should send post request /api/articles', function() {

            var request = JSON.stringify({
                username: "vlad",
                title: "pass"
            });

            var callback = function(data) {
                $rootScope.data = data;
            };
            articlesService.createArticle(request, callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectPOST('/api/articles', request).respond(200, {
                status: "ok"
            });
            $httpBackend.flush();
            expect($rootScope.data.status).toEqual("ok");
        });
    });

    describe('updateArticle', function() {
        it('updateArticle should send put request /api/articles/:id', function() {

            var request = JSON.stringify({
                rating: 5
            });
            var id = "1";
            var callback = function(data) {
                $rootScope.data = data;
            };
            articlesService.updateArticle(request, id, callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectPUT('/api/articles/' + id, request).respond(200, {
                status: "ok"
            });
            $httpBackend.flush();
            expect($rootScope.data.status).toEqual("ok");
        });
    });

    describe('deleteArticle', function() {
        it('deleteArticle should send delete request /api/article/:id', function() {
            var id = "1";
            var callback = function(data) {
                $rootScope.data = data;
            };
            articlesService.deleteArticle(id, callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectDELETE('/api/articles/' + id).respond(200, {
                status: "ok"
            });
            $httpBackend.flush();
            expect($rootScope.data.status).toEqual("ok");
        });
    });

    describe('getRandomArticle', function() {
        it('getRandomArticle should send get request /api/articles/random', function() {
            var callback = function(data) {
                $rootScope.data = data;
            };
            articlesService.getRandomArticle(callback);
            $httpBackend.expectGET('resource/en.json').respond(200);
            $httpBackend.expectGET('/api/articles/random').respond(200, {
                status: "ok"
            });
            $httpBackend.flush();
            expect($rootScope.data.status).toEqual("ok");
        });
    });

});
