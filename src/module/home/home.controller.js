(function() {
    'use strict';

    angular
        .module('rp.home')
        .controller('rp.home.controller', homeController);

    homeController.$inject = ['$scope', 'LATEST', 'POPULAR'];

    function homeController($scope, LATEST, POPULAR) {
        $scope.latest = LATEST.items;
        $scope.popular = POPULAR.items;
    }
})();
