(function() {
    'use strict';
    angular
        .module('rp.search')
        .controller('rp.search.controller', searchController);

    searchController.$inject = ['$scope', 'RESULTS'];

    function searchController($scope, RESULTS) {
        $scope.searchResults = RESULTS.items;
        $scope.searchText = RESULTS.q;
    }
})();
