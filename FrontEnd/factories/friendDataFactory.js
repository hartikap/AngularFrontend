main_module.factory('friendDataFactory',function($resource,$http) {
    
    var factory = {};
    
    // In this array we cache the friends information so we need not
    // make further requests if the information hasn't changed
    factory.friendsArray = [];
    
    factory.getFriendData = function (callback) {
        
        if (factory.friendsArray.length === 0)
        {
        
            var req = $resource('/friends', {}, {'get':{method:'GET'}});
        
            req.query().$promise.then(function(data) {
                
                console.log("Response friendDataFactoryssä getille: " + data);
                factory.friendsArray = data;
                callback(factory.friendsArray);
                //$location.path('/list').replace();
            
            }, function(error) {
                
                friendsArray = [];
                //$location.path('/list').replace();
        
            });
   
        } else {
            callback(factory.friendsArray);
            //$location.path('/list').replace();
        }
        
    }
    
    factory.addFriendData = function (data) {
        
        // Create a resource for context '/persons'
        var req = $resource('/persons', {}, {'post': {method:'POST'}});
        // Use PUT method to send the new person info to above context
        // Note that we return an promise object from here
        return req.save(data).$promise;
        
    }
    
        
        
    return factory;
    
});