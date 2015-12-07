// This is the way you define controllers.
// The main_module variable is defined in mainModule.js file(located in module folder).
// The first argument is the name of the controller. THIS IS IMPORTANT, because you use THIS
// name when you want to use this controller in some view.
// The $scope-object is the glue between the view and controller. You use this object
// to transfer data between the view and the controller.
main_module.controller('controllerLogin', function($scope, loginFactory, $location) {
    
    //var user = $scope.user;
    //$scope.pass = "hahaaa";
    
    $scope.loginClicked = function () {
        
        console.log("login was clicked");
        var temp = {
            username: $scope.user,
            password: $scope.pass
        }
        
        var waitPromise = loginFactory.startlogin(temp);
        // Wait the response from server
        waitPromise.then(function(data) {
            // Code inside this function will be called when success response
            // from server is received
            $location.path('/list');
        }, function(data) {
            $('.error').text('Wrong username or password!');
        });
    
    }
    
    $scope.registerClicked = function () {
        console.log("register was clicked");
        
        var temp = {
            username: $scope.user,
            password: $scope.pass
        }
        
        var waitPromise = loginFactory.startregister(temp);
        // Wait the response from server
        waitPromise.then(function(data) {
            // Code inside this function will be called when success response
            // from server is received
            //$location.path('/list');
        }, function(data) {
            $('.error').text('Wrong username or password!');
        });
        
        
    }
    
    
});