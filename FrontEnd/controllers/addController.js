main_module.controller('addController', function($scope, friendDataFactory, $location) {
    
    
    // Click handler for adding new person to database
    $scope.addPersonClicked = function() {
        
        console.log("addperson clicked");
        var temp = {
            name: $scope.addName,
            address: $scope.addAddress,
            age: $scope.addAge
        }
    
        friendDataFactory.addFriendData(temp).then(function(data) {
            console.log("Person added");
            friendDataFactory.friendsArray.push(data.data);
            $location.path('/list');
        }, function(data) {
            $('.error').text('Person add error!!');
        });
        
    
    }
     
    
    
});