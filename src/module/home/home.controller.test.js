'use strict';

describe('controller rp.home/home', function () {

    var ctrl, $scope, LATEST, POPULAR;

    beforeEach(module('rp.home'));

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        LATEST = {
            items: 'lastest items'
        };
        POPULAR = {
            items: 'lastest items'
        };
        ctrl = $controller('rp.home.controller', {
            $scope: $scope,
            LATEST: LATEST,
            POPULAR: POPULAR
        });
    }));

    it('should set latest to all items in LATEST', function () {
        // Arrange
        // Act
        // Assert
        expect($scope.latest).toBe(LATEST.items);
    });

    it('should set popular to all items in POPULAR', function () {
        // Arrange
        // Act
        // Assert
        expect($scope.popular).toBe(POPULAR.items);
    });

});
