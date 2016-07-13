module.exports = function($rootScope, $translate, $scope, usersService, $users) {
    'use strict';

    this.show = false;
    this.user = usersService.isLogged();
    this.username = usersService.getUser();
    $rootScope.locale = $translate.proposedLanguage();

    $rootScope.$on('userSignIn', angular.bind(this, function() {
            this.username = usersService.getUser();
            this.user = usersService.isLogged();
    }));

    this.showSignIn = function() {
        $rootScope.$emit('showSignIn');
    };

    this.changeLang = function(locale) {
        $rootScope.locale = locale;
        $translate.use($rootScope.locale);

    };

    this.logout = function() {
        $users.logout(angular.bind(this, function(data) {
                usersService.setUser('');
                usersService.logged(false);
                this.user = usersService.isLogged();
                $rootScope.$broadcast('logout');
        }));
    };
};
