// Loose augmentation JS module pattern
var app = (function (app, undefined) {
    'use strict';
    
    app = app || {};
    
    // Deal with possible jQuery conflicts
    var $ = app.$ || $;
    
    /*
     * Private function example
     */
    var myFunction = function () {
        console.log("script2");
    };  
    
    // Expose API
    app.myFunction = myFunction;
            
    $(function () {
        // Execute function when DOM is ready
        myFunction();
    });

    return app;
}(app));
