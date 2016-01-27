(function() {
    'use strict';

    angular
        .module('reposed', [
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'angular-loading-bar',
            'rp.navbar',
            'rp.home',
            'rp.data',
            'rp.search',
            'rp.repo',
            'rp.issues',
        ]);
})();
