var app = angular.module('EncountersApp');

app.service('dataManager', [function () {
    
    var self = this;
    
    self.data = {
        adventurers: {},
        monsters: {},
        encounters: {},
        lengths: {
            adventurers: 0,
            monsters: 0,
            encounters: 0
        },
        counts: {
            adventurers: 0,
            monsters: 0,
            encounters: 0
        }
    };
    
    self.createAdventurer = function (name) {
        var adventurer = {
            id: 'adventurer-' + self.data.counts.adventurers,
            name: name
        };
        
        self.data.adventurers[adventurer.id] = adventurer;
        self.data.lengths.adventurers++;
        self.data.counts.adventurers++;
        
        return adventurer;
    };
    
    self.updateAdventurer = function (adventurer) {
        var updated = false;
        
        if (self.data.adventurers[adventurer.id]) {
            self.data.adventurers[adventurer.id] = angular.copy(adventurer);
            updated = true;
        }
        
        return updated;
    };
    
    self.createMonster = function (name, ac, hp, xp) {
        var monster = {
            id: 'monster-' + self.data.counts.monsters,
            name: name,
            ac: ac,
            hp: hp,
            xp: xp
        };
        
        self.data.monsters[monster.id] = monster;
        self.data.lengths.monsters++;
        self.data.counts.monsters++;
        
        return monster;
    };
    
    self.updateMonster = function (monster) {
        var updated = false;
        
        if (self.data.monsters[monster.id]) {
            self.data.monsters[monster.id] = angular.copy(monster);
            updated = true;
        }
        
        return updated;
    };
    
    self.createEncounter = function () {
        var encounter = {
            id: 'encounter-' + self.data.counts.encounters,
            enemies: [],
            initiatives: {
                enemies: {},
                adventurers: {}
            },
            hp: {}
        };
        
        self.data.encounters[encounter.id] = encounter;
        self.data.lengths.encounters++;
        self.data.counts.encounters++;
        
        return encounter;
    };
    
    self.removeEncounter = function (encounter) {
        self.data.encounters[encounter.id] = undefined;
        delete self.data.encounters[encounter.id];
        self.data.lengths.encounters--;
    };
    
    self.save = function () {
        
    };
    
    self.load = function () {
        
    };
    
    return self;
}]);