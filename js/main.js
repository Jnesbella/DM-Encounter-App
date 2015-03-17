var app = angular.module('EncountersApp', []);

app.run(['$rootScope', 'dataManager', '$interval', function ($rootScope, dataManager, $interval) {
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
    
    var load = function () {
        var monsters = JSON.parse(localStorage.getItem('monsters'));
        if (monsters) {
            dataManager.data.lengths.monsters = monsters.length;
            dataManager.data.counts.monsters = monsters.count;
            dataManager.data.monsters = monsters.data;
        }
        
        var adventurers = JSON.parse(localStorage.getItem('adventurers'));
        if (adventurers) {
            dataManager.data.lengths.adventurers = adventurers.length;
            dataManager.data.counts.adventurers = adventurers.count;
            dataManager.data.adventurers = adventurers.data;
        }
        
        var sessions = JSON.parse(localStorage.getItem('sessions'));
        if (sessions) {
            $rootScope.sessions = sessions;
        };
    };
    load();
    
    $rootScope.selectedSession;
    $rootScope.$watch('selectedSession', function (newValue, oldValue) {
        if (newValue) {
            var session = $rootScope.sessions[newValue];
            var id = session.id.substring('session-'.length);
            $rootScope.sessionId = id;
            dataManager.data.lengths.encounters = session.length;
            dataManager.data.counts.encounters = session.count;
            dataManager.data.encounters = session.encounters;
        }
    });
    
    var save = function () {
        if ($rootScope.sessionId) {
            var session = {
                id: 'session-' + $rootScope.sessionId,
                length: dataManager.data.lengths.encounters,
                count: dataManager.data.counts.encounters,
                encounters: dataManager.data.encounters
            }
            
            var sessions = JSON.parse(localStorage.getItem('sessions'));
            if (!sessions) {
                sessions = {};
            }
            
            sessions[session.id] = session;
            localStorage.setItem('sessions', JSON.stringify(sessions));
        }
        
        var monsters = {
            length: dataManager.data.lengths.monsters,
            count: dataManager.data.counts.monsters,
            data: dataManager.data.monsters
        };
        localStorage.setItem('monsters', JSON.stringify(monsters));
        
        var adventurers = {
            length: dataManager.data.lengths.adventurers,
            count: dataManager.data.counts.adventurers,
            data: dataManager.data.adventurers
        };
        localStorage.setItem('adventurers', JSON.stringify(adventurers));
    };
    var savePromise = $interval(save, 500);
}]);