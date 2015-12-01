main_module.factory('loginFactory', function(){
    
    var factory = {};
    
    // This function can be called from ANY controller using this factory implementation
    factory.startlogin = function(data) {
        
        console.log(data);
        
    }
    
    // Factory must always return an object!!
    return factory;
        
});