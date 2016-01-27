'use strict';

describe('controller rp.repo/repo', function () {

    var ctrl, $scope, REPO;

    beforeEach(module('rp.repo'));

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        REPO = 'repo';
        ctrl = $controller('rp.repo.controller', {
            $scope: $scope,
            REPO: REPO
        });
    }));

    it('should set repo to REPO', function () {
        // Arrange
        // Act
        // Assert
        expect($scope.repo).toBe(REPO);
    });

});
