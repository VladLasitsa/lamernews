module.exports = function($scope) {

    $scope.user = {};

    $scope.SignIn = function($event) {
        $event.preventDefault();
        fetch('http://localhost:1000/signup', {
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",

                },
                mode: 'no-cors',
                body: 'username=' + $scope.user.login + '&password=' + $scope.user.password
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log('Request failed', error);
            });
    };
};
