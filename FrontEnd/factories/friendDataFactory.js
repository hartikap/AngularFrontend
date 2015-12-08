main_module.factory('friendDataFactory', function($resource) {
    
    var factory = {};
    
    // In this array we cache the friends information so we need not
    // make further requests if the information hasn't changed
    factory.friendsArray = [];
    
    factory.getFriendData = function () {
        
        var resource = $resource('/friends', {}, {'get':{method:'GET'}});
        return resource.query().$promise;
            
    }
    
    
    return factory;
    
});