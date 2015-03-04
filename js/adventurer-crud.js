var app = angular.module('EncountersApp');

app.controller('adventurerCrudController', ['$scope', 'dataManager', function ($scope, dataManager) {
    
    $scope.MODES = {
        CREATE: 'create',
        UPDATE: 'update'
    };
    
    $scope.mode;
    
    $scope.baseAdventurer = {
        name: ''
    };
    
    $scope.data;
    $scope.selectedAdventurer;
    
    $scope.selectAdventurer = function (adventurer) {
        $scope.selectedAdventurer = adventurer;  
    };
    
    var determineMode = function () {
        $scope.mode = $scope.MODES.CREATE;
        if ($scope.data.id !== undefined) {
            $scope.mode = $scope.MODES.UPDATE;
        }
    };
    
    $scope.$watch('selectedAdventurer', function (newValue, oldValue) {
        if (newValue) {
            $scope.data = angular.copy(newValue);
            determineMode();
        }
    });
    
    $scope.getAdventurers = function () {
        return dataManager.data.adventurers;
    };
    
    $scope.cancel = function () {
        $scope.data = angular.copy($scope.selectedAdventurer);
        determineMode();
    };
    
    $scope.save = function () {
        if ($scope.mode === $scope.MODES.CREATE) {
            $scope.selectAdventurer(dataManager.createAdventurer($scope.data.name));
        }
        
        else if ($scope.mode === $scope.MODES.UPDATE) {
            dataManager.updateAdventurer($scope.data);
        }
    };
    
    var init = function () {
        $scope.selectAdventurer($scope.baseAdventurer);
    };
    init();
}]);

app.directive('adventurerCrud', [function () {
    return {
        restrict: 'E',
        controller: 'adventurerCrudController',
        templateUrl: 'html/adventure-crud.html',
        scope: true
    };
}]);