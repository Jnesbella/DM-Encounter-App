var app = angular.module('EncountersApp');

app.controller('monsterCrudController', ['$scope', 'dataManager', function ($scope, dataManager) {
    
    $scope.MODES = {
        CREATE: 'create',
        UPDATE: 'update'
    };
    
    $scope.mode;
    
    $scope.baseMonster = {
        name: '',
        ac: 0,
        hp: 0,
        xp: 0
    };
    
    $scope.data;
    $scope.selectedMonster;
    
    $scope.selectMonster = function (monster) {
        $scope.selectedMonster = monster;  
    };
    
    var determineMode = function () {
        $scope.mode = $scope.MODES.CREATE;
        if ($scope.data.id !== undefined) {
            $scope.mode = $scope.MODES.UPDATE;
        }
    };
    
    $scope.$watch('selectedMonster', function (newValue, oldValue) {
        if (newValue) {
            $scope.data = angular.copy(newValue);
            determineMode();
        }
    });
    
    $scope.getMonsters = function () {
        return dataManager.data.monsters;
    };
    
    $scope.cancel = function () {
        $scope.data = angular.copy($scope.selectedMonster);
        determineMode();
    };
    
    $scope.save = function () {
        if ($scope.mode === $scope.MODES.CREATE) {
            $scope.selectMonster(dataManager.createMonster($scope.data.name, $scope.data.ac, $scope.data.hp, $scope.data.xp));
        }
        
        else if ($scope.mode === $scope.MODES.UPDATE) {
            dataManager.updateMonster($scope.data);
        }
    };
    
    var init = function () {
        $scope.selectMonster($scope.baseMonster);
    };
    init();
}]);

app.directive('monsterCrud', [function () {
    return {
        restrict: 'E',
        controller: 'monsterCrudController',
        templateUrl: 'html/monster-crud.html',
        scope: true
    };
}]);