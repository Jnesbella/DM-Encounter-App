var app = angular.module('EncountersApp', []);

app.run(['$rootScope', 'dataManager', function ($rootScope, dataManager) {
    // DATA WRAPPER FUNCTIONS
    $rootScope.createEncounter = function () {
        dataManager.createEncounter();
    };
    
    $rootScope.removeEncounter = function (encounter) {
        dataManager.removeEncounter(encounter);
    };
    
    $rootScope.getEncounters = function() {
        return dataManager.data.encounters;  
    };
    
    //TEST DATA
    // ENEMIES
    var kobold = dataManager.createMonster('kobold', 12, 5, 25);
    var wingedKobold = dataManager.createMonster('winged kobold', 13, 7, 50);
    
    // ADVENTURERS
    var drZ = dataManager.createAdventurer('Dr. Zimbardo');
    var sanguin = dataManager.createAdventurer('Sanguin');
    var thor = dataManager.createAdventurer('Thor');
    var sir = dataManager.createAdventurer('Sir');
}]);