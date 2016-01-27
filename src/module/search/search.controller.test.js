'use strict';

describe('controller rp.search/search', function () {

    var ctrl, $scope, RESULTS;

    beforeEach(module('rp.search'));

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        RESULTS = {
            items: 'results items',
            q: 'query'
        }
        ctrl = $controller('rp.search.controller', {
            $scope: $scope,
            RESULTS: RESULTS
        });
    }));

    it('should set searchResults to all items in RESULTS', function () {
        // Arrange
        // Act
        // Assert
        expect($scope.searchResults).toBe(RESULTS.items);
    });

    it('should set searchText to q in RESULTS', function () {
        // Arrange
        // Act
        // Assert
        expect($scope.searchText).toBe(RESULTS.q);
    });

});
