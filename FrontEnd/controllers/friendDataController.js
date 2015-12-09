main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
    
    console.log('friendDataController loaded');
    console.log(friendDataFactory.friendsArray);
    
   
    friendDataFactory.getFriendData(dataCallback);

    
    function dataCallback(responseArray) {
     
        $scope.friendData = responseArray;
        //$factory.friendsArray = response.data;
        
    }
        

 
        
        
});