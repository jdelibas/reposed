angular.module('reposed')
  .config(
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('root',{
            url: '',
            views: {
                'navbar': {
                    templateUrl: 'navbar/navbar.view.html',
                    controller: 'rp.navbar.controller',
                    resolve: {
                        POPULAR: function($q, api) {
                            return api.searchRepos({
                                q: 'a',
                                sort: 'stars'
                            });
                        }
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
                        LATEST: function($q, api) {
                            return api.searchRepos({
                                q: 'a',
                                sort: 'updated'
                            });
                        },
                        POPULAR: function($q, api) {
                            return api.searchRepos({
                                q: 'a',
                                sort: 'stars'
                            });
                        }
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
                        RESULTS: function($q, api, $stateParams) {
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
                        }
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
                        REPO: function($q, api, $stateParams) {
                            return api.getRepo({
                                repo: $stateParams.repo
                            });
                        }
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
                        ISSUES: function($q, api, $stateParams) {
                            return api.getIssues({
                                repo: $stateParams.repo
                            });
                        }
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

    });
