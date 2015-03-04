var app = angular.module('EncountersApp');

app.filter('getRange', function () {
    return function(count) {
        var range = [];
        
        for (var i = 0; i < count; i++) {
            range.push(i);   
        }
        
        return range;
    };
});