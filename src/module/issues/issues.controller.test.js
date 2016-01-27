'use strict';

describe('controller rp.issues/issues', function () {

    var ctrl, $scope, ISSUES, $uibModal;

    beforeEach(module('rp.issues'));

    beforeEach(inject(function ($rootScope, $controller) {
        $uibModal = jasmine.createSpyObj('toastr', ['open']);
        $scope = $rootScope.$new();
        ISSUES = {
            items: 'issues'
        };
        ctrl = $controller('rp.issues.controller', {
            $scope: $scope,
            ISSUES: ISSUES,
            $uibModal: $uibModal
        });
    }));

    it('should set issues to all items in ISSUES', function () {
        // Arrange
        // Act
        // Assert
        expect($scope.issues).toBe(ISSUES.items);
    });

    describe('viewIssue()', function () {
        it('should call modal', function () {
            // Arrange
            // Act
            $scope.viewIssue();
            // Assert
            expect($uibModal.open).toHaveBeenCalled;
        });
    });

});
