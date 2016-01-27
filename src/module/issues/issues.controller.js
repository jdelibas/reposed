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
                    ISSUE: function() {
                        return issue;
                    }
                }
            });
        };

        $scope.updateFilters = function() {
            for (var filter in $scope.filters) {
                if ($scope.filters.hasOwnProperty(filter) &&
                    $scope.filters[filter]) {
                    $state.params[filter] = $scope.filters[filter];
                }
            }
            $state.go('.', $stateParams, {reload: true});
        }
    };
})();
