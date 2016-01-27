'use strict';

describe('controller rp.issues/issues', function () {

    var ctrl, $scope, ISSUE;

    beforeEach(module('rp.issues'));

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        ISSUE = 'some issue';
        ctrl = $controller('rp.issueModal.controller', {
            $scope: $scope,
            ISSUE: ISSUE
        });
    }));

    it('should set issue to resolve data', function () {
        // Arrange
        // Act
        // Assert
        expect($scope.issue).toBe(ISSUE);
    });

});
