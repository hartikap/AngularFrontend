main_module.factory('loginFactory', function($resource) {
    
    var factory = {};
    
    // This function can be called from ANY controller using this factory implementation
    factory.startlogin = function(data) {
        
        console.log(data);
        // Create a resource for context '/friends/login'
        var req = $resource('/friends/login', {}, {'post': {method:'POST'}});
        // Use POST method to send the username and password to above context
        // Note that we return an promise object from here
        return req.post(data).$promise;
        
    }
    
    factory.startregister = function(data) {
        
        var req = $resource('/friends/register', {}, {'post': {method:'POST'}});
        // Use POST method to send the username and password to above context
        // Note that we return an promise object from here
        return req.post(data).$promise;
        
    }
    
    // Factory must always return an object!!
    return factory;
        
});