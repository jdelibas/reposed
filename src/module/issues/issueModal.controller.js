(function() {
    'use strict';

    angular
        .module('rp.issues')
        .controller('rp.issueModal.controller', issueController);

    issueController.$inject = ['$scope', '$uibModalInstance', 'ISSUE'];

    function issueController($scope, $uibModalInstance, ISSUE) {
        $scope.issue = ISSUE;
    };
})();
