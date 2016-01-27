(function() {
    'use strict';
    angular
        .module('rp.navbar')
        .controller('rp.navbar.controller', navbarController);

    navbarController.$inject = ['$scope', '$state', 'POPULAR'];

    function navbarController($scope, $state, POPULAR) {
        $scope.repoNameList = POPULAR.items.map(function(val) {
            return val['name'];
        });
        $scope.searchRepos = function(searchText) {
            $state.go('root.search', {
                q: searchText
            });
        };
    }
})();
