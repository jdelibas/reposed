(function() {
    'use strict';
    angular
        .module('rp.repo')
        .controller('rp.repo.controller', repoController);

    repoController.$inject = ['$scope', 'REPO'];

    function repoController($scope, REPO) {
        $scope.repo = REPO;
    }
})();
