module.exports = function($scope, $users, $rootScope, usersService) {
  'use strict';
    this.user = {};
    this.error = false;
    this.errorSign = false;
    this.errorRegistred = false;
    this.show = false;
    $rootScope.$on('showSignIn', angular.bind(this, function() {
        this.show = true;
    }));

    this.hide = function() {
        this.show = false;
    };

    this.signIn = function() {
        if (this.user.login !== '' && this.user.password !== '') {
            var req = 'username='+this.user.login+'&password='+this.user.password;
            $users.signIn(req, angular.bind(this, function(data) {
                  if(angular.equals(data.status, 'OK')){
                    usersService.setUser(data.user.username);
                    usersService.logged(true);
                    this.show = false;
                  }
                  else {
                      this.errorSign = true;
                      this.error = false;
                      this.errorRegistred = false;
                      this.user = {};
                  }
                if(!this.show){
                    $rootScope.$emit('userSignIn');
                }

            }));
        } else {
            this.error = true;
            this.errorRegistred = false;
            this.errorSign = false;
            this.user = {};
        }
    };

    this.registred = function() {
        var login = this.user.login;
        var password = this.user.password;
        if (!angular.equals(login, '') && !angular.equals(password, '')) {
            var req = 'username='+this.user.login+'&password='+this.user.password;
            $users.createUser(req, angular.bind(this, function(data) {
                  if(angular.equals(data.status, 'OK')){
                    usersService.setUser(data.user.username);
                    usersService.logged(true);
                    this.show = false;
                  }
                  else {
                    this.error = false;
                    this.errorRegistred = true;
                    this.errorSign = false;
                    this.user = {};
                  }
                if(!this.show){
                    $rootScope.$emit('userSignIn');
                }
            }));
        } else {
            this.error = true;
            this.errorRegistred = false;
            this.errorSign = false;
            this.user = {};
        }
    };
};
