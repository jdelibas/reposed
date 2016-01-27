(function() {
    'use strict';

    angular
        .module('rp.data')
        .service('api', apiService);

    apiService.$inject = ['APIURL', '$http', '$q', 'toastr'];

    function apiService(APIURL, $http, $q, toastr) {
        var urlBase = APIURL;
        var api = {
            searchRepos: searchRepos,
            getRepo: getRepo,
            getIssues: getIssues,
            getContributors: getContributors,
            getStargazers: getStargazers
        };

        return api;
        /////////////////////

        function searchRepos(params) {
            var url = urlBase + '/search/repositories?';
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    url += key + '=' + params[key] + '&';
                }
            }
            return httpGet(url);
        }

        function getRepo(params) {
            var url = urlBase + '/repos/' + decodeURIComponent(params.repo);
            return httpGet(url);
        }

        function getIssues(params) {
            var url = urlBase + '/search/issues?q=';
            if (params.repo) {
                url += 'repo:' + decodeURIComponent(params.repo);
            }
            if (params.status) {
                url += ' state:' + params.status;
            }
            return httpGet(url);
        }

        function getContributors(params) {
            var url = urlBase + '/repos/' + decodeURIComponent(params.repo) + '/stats/contributors';
            return httpGet(url);
        }

        function getStargazers(params) {
            var url = urlBase + '/repos/' + decodeURIComponent(params.repo) + '/stargazers';
            return httpGet(url);
        }

        function httpGet(url) {
            var deffered = $q.defer();
            $http.get(url, {
                cache: true
            })
                .success(function(data) {
                    deffered.resolve(data);
                })
                .error(function(err, status) {
                    errorHandler(err, status);
                    deffered.reject(err, status);
                });
            return deffered.promise;
        }

        function errorHandler(err, status) {
            var statusList = {
                '403': 'API Rate Limit'
            };
            toastr.error(statusList[status] || 'Github API error');
        }
    };
})();
