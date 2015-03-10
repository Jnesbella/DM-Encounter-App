var app = angular.module('EncountersApp');

app.controller('encounterController', ['$scope', 'dataManager', function ($scope, dataManager) {
    
    $scope.GROUPS = {
        PARTY: 'party',
        ENEMY: 'enemy'
    };
    
    $scope.TYPES = {
        MONSTER: 'monster',
        ADVENTURER: 'adventurer',
    };
    
    $scope.participantLock = false;
    $scope.toggleParticipantLock = function () {
        $scope.participantLock = !$scope.participantLock;
        
        if (!$scope.participantLock) {
            $scope.encounter.turnOrder = {};
        }
        
        else {
            $scope.calculateTurnOrder();
        }
    };
    
    $scope.participantCount = 0;
    $scope.createParticipant = function (type, group) {
        var participant = {
            id: 'participant-' + $scope.participantCount,
            type: type,
            group: group,
            initiative: type === $scope.TYPES.MONSTER ? Math.floor(Math.random() * 20) + 1 : '',
            hp: '',
            refId: '',
            count: ''
        };
        
        $scope.encounter.participants[participant.id] = participant;
        $scope.participantCount++;
        
        return participant;
    };
    
    $scope.removeParticipant = function (participant) {
        var removed = false;
        
        if ($scope.encounter.participants[participant.id]) {
            $scope.encounter.participants[participant.id] = undefined;
            delete $scope.encounter.participants[participant.id];
            removed = true;
        }
        
        return removed;
    };
    
    $scope.addToParty = function (type) {
        return $scope.createParticipant(type, $scope.GROUPS.PARTY);
    };
    
    $scope.addToEnemies = function (type) {
        return $scope.createParticipant(type, $scope.GROUPS.ENEMY);
    };
    
    $scope.getMonsters = function() {
        return dataManager.data.monsters;
    };
    
    $scope.getAdventurers = function() {
        return dataManager.data.adventurers;
    };
    
    $scope.$watch('encounter', function (newValue, oldValue) {
        if (newValue) {
            for (var prop in $scope.getAdventurers()) {
                var adventurer = $scope.getAdventurers()[prop];
                var participant = $scope.addToParty($scope.TYPES.ADVENTURER);
                participant.refId = adventurer.id;
            }
        }
    });
    
    $scope.validParticipants = 0;
    $scope.calculateTurnOrder = function () {
        $scope.encounter.turnOrder = {};
        $scope.validParticipants = 0;
        
        var participants = angular.copy($scope.encounter.participants);
        
        var sortedCount = 0;
        while (sortedCount < $scope.participantCount) {
            var toSort = undefined;
            for (var prop in participants) {
                var participant = participants[prop];
                if (participant && participant.refId && participant.initiative && participant.initiative > 0) {
                    if (!toSort || (toSort && participant.initiative > participants[toSort].initiative)) {
                        toSort = prop;
                    }
                }
            }
            
            if (toSort) {
                $scope.encounter.turnOrder[$scope.validParticipants] = participants[toSort];
                $scope.validParticipants++;
            
                participants[toSort] = undefined;
                delete participants[toSort];
            }
            
            sortedCount++;
        }
    };
    
    var swap = function (origin, offset) {
        var swapped;
        
        var target = parseInt(origin) + offset;
        if ($scope.encounter.turnOrder[target]) {
            var temp = $scope.encounter.turnOrder[target];
            $scope.encounter.turnOrder[target] = $scope.encounter.turnOrder[origin];
            $scope.encounter.turnOrder[origin] = temp;
            
            swapped = true;
        }
        
        return swapped;
    };
    
    $scope.moveUp = function (order) {
        swap(order, -1);
    };
    
    $scope.moveDown = function (order) {
        swap(order, 1);
    };
    
    $scope.slay = function (participant, index) {
        if (participant.type === $scope.TYPES.MONSTER && participant.refId) {
            $scope.encounter.combat[participant.id][index].isDead = true;
            $scope.encounter.rewards.xp += $scope.getMonsters()[participant.refId].xp;
        }
    };
    
    $scope.initCombat = function (participant) {
        if (participant.type === $scope.TYPES.MONSTER && participant.refId && participant.count > 0) {
            $scope.encounter.combat[participant.id] = {};
            for (var i = 0; i < participant.count; i++) {
                $scope.encounter.combat[participant.id][i] = {
                    hp: $scope.getMonsters()[participant.refId].hp,
                    description: '',
                    isDead: false
                };
            }
        }
    };
}]);

app.directive('encounter', [function () {
    return {
        restrict: 'E',
        templateUrl: 'html/encounter.html',
        //replace: true,
        controller: 'encounterController',
        scope: {
            encounter: '=ngModel'
        }
    };
}]);