(function() {
    'use strict';

    angular
        .module('rp.issues')
        .controller('rp.issueModal.controller', issueController);

    issueController.$inject = ['$scope', 'ISSUE'];

    function issueController($scope, ISSUE) {
        $scope.issue = ISSUE;
    };
})();
