(function() {
    'use strict';

    angular
        .module('rp.data', [
            'angular-cache',
            'toastr'
        ])
        .value('APIURL', 'https://api.github.com')
        .run(runFunction);

    runFunction.$inject = ['$http', 'CacheFactory'];
    function runFunction($http, CacheFactory) {
        var cache = CacheFactory.get('rp-data-cache');
        if (!cache) {
            cache = CacheFactory('rp-data-cache', {
                maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
                cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
                deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire,
                storageMode: 'localStorage',
                capacity: 15
            });
        }
        $http.defaults.cache = cache;
    }

})();
