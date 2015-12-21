main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
    
    console.log('friendDataController loaded');
    console.log(friendDataFactory.friendsArray);
    
   
    friendDataFactory.getFriendData(dataCallback);

    
    function dataCallback(responseArray) {
     
        $scope.friendData = responseArray;
        //$factory.friendsArray = response.data;
        
    }
        

    $scope.rowClicked = function(id) {
        
        console.log("Klikkasit id:tä: " + id);
        $('.question').text("<div class="alert alert-success" role="alert"> <a href="#" class="alert-link">...</a> </div> <div class="alert alert-info" role="alert">
  <a href="#" class="alert-link">...</a>
</div>")
    }
    
    
    $scope.items = [
    'Modify',
    'Delete',
    ];

    $scope.status = { 
        isopen: false
    };

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
    $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
        
 
        
        
});