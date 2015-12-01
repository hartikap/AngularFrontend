// This is the way you define controllers.
// The main_module variable is defined in mainModule.js file(located in module folder).
// The first argument is the name of the controller. THIS IS IMPORTANT, because you use THIS
// name when you want to use this controller in some view.
// The $scope-object is the glue between the view and controller. You use this object
// to transfer data between the view and the controller.
main_module.controller('controllerLogin', function($scope, loginFactory) {
    
    //var user = $scope.user;
    //$scope.pass = "hahaaa";
    
    $scope.loginClicked = function () {
        console.log("login was clicked");
        var temp = {
            username: $scope.user,
            password: $scope.password
        }
        
        loginFactory.startlogin(temp);
    
    }
    
    $scope.registerClicked = function () {
        console.log("register was clicked");
    }
    
    
});