(function() {
    'use strict';
    angular
        .module('reposed')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('root',{
                url: '',
                views: {
                    'navbar': {
                        templateUrl: 'navbar/navbar.view.html',
                        controller: 'rp.navbar.controller',
                        resolve: {
                            POPULAR: ['api', function(api) {
                                return api.searchRepos({
                                    q: 'a',
                                    sort: 'stars'
                                });
                            }]
                        }
                    }
                }
            })
            .state('root.home', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'home/home.view.html',
                        controller: 'rp.home.controller',
                        resolve : {
                            LATEST: ['api', function(api) {
                                return api.searchRepos({
                                    q: 'a',
                                    sort: 'updated'
                                });
                            }],
                            POPULAR: ['api', function(api) {
                                return api.searchRepos({
                                    q: 'a',
                                    sort: 'stars'
                                });
                            }]
                        }
                    }
                }
            })
            .state('root.search', {
                url: '/search?q',
                views: {
                    'content@': {
                        templateUrl: 'search/search.view.html',
                        controller: 'rp.search.controller',
                        resolve : {
                            RESULTS: ['$q', 'api', '$stateParams',
                            /* istanbul ignore next */
                                      function($q, api, $stateParams) {
                                var deferred = $q.defer();
                                api.searchRepos({
                                    q: $stateParams.q
                                })
                                    .then(function(data) {
                                        deferred.resolve({
                                            items: data.items,
                                            q: $stateParams.q
                                        });
                                    }, function(err) {
                                        deferred.reject(err);
                                    });
                                return deferred.promise;
                            }]
                        }
                    }
                }
            })
            .state('root.repo', {
                url: '/:repo',
                abstract: true,
                views: {
                    'content@': {
                        templateUrl: 'repo/repo.view.html',
                        controller: 'rp.repo.controller',
                        resolve : {
                            REPO: ['api', '$stateParams',
                            /* istanbul ignore next */
                                   function(api, $stateParams) {
                                return api.getRepo({
                                    repo: $stateParams.repo
                                });
                            }]
                        }
                    }
                }
            })
            .state('root.repo.issues', {
                url: '/issues/?status',
                views: {
                    'content@root.repo': {
                        templateUrl: 'issues/issues.view.html',
                        controller: 'rp.issues.controller',
                        resolve : {
                            ISSUES: ['api', '$stateParams',
                            /* istanbul ignore next */
                                     function(api, $stateParams) {
                                return api.getIssues({
                                    repo: $stateParams.repo
                                });
                            }]
                        }
                    }
                }
            })
            .state('root.repo.stars', {
                url: '/stars',
                views: {
                    'content@root.repo': {
                        templateUrl: 'stars/stars.view.html'
                    }
                }
            });

    };
})();

