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
    
    $scope.participantCount = 0;
    $scope.createParticipant = function (type, group) {
        var participant = {
            id: 'participant-' + $scope.participantCount,
            type: '',
            group: '',
            initiative: '',
            hp: '',
            refId: ''
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
    
    $scope.addTo;
    $scope.addEnemy;
    //
    $scope.getEnemies = function() {
        return dataManager.data.enemies;
    };
    
    $scope.getAdventurers = function() {
        return dataManager.data.adventurers;
    };
    
    $scope.addEnemy = function () {
        $scope.encounter.enemies.push({
            id: '',
            count: 0,
            initiative: Math.floor(Math.random() * 20) + 1
        });
    };
    
    $scope.removeEnemy = function (index) {
        $scope.encounter.enemies.splice(index, 1);
    };
    
    $scope.configEnemyHp = function (enemyId, count) {
        $scope.encounter.hp[enemyId] = [];
        for (var i = 0; i < count; i++) {
            $scope.encounter.hp[enemyId][i] = $scope.getEnemies()[enemyId].hp;
        }
    };
    
    var init = function() {
        
    };
    init();
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