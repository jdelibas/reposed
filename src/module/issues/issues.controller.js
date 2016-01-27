(function() {
    'use strict';

    angular
        .module('rp.issues')
        .controller('rp.issues.controller', issuesController);

    issuesController.$inject = ['$scope', '$state', '$stateParams', '$uibModal', 'ISSUES'];

    function issuesController($scope, $state, $stateParams, $uibModal, ISSUES) {

        $scope.issues = ISSUES.items;
        $scope.filters = $stateParams;

        $scope.viewIssue = function (issue) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'issues/issueModal.view.html',
                controller: 'rp.issueModal.controller',
                size: 'lg',
                resolve: {
                    ISSUE:
                    /* istanbul ignore next */
                    function() {
                        return issue;
                    }
                }
            });
        };
    };
})();
