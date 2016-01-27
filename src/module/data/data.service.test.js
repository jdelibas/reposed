'use strict';

describe('service rp.data/api', function () {

    var api, $httpBackend, toastr;

    beforeEach(module('rp.data'));

    beforeEach(module(function ($provide) {
        toastr = jasmine.createSpyObj('toastr', ['error']);
        $provide.value('toastr', toastr);

        $provide.value('APIURL', 'someurl');
    }));

    beforeEach(inject(function ($injector, _$httpBackend_) {
        api = $injector.get('api');
        $httpBackend = _$httpBackend_;
    }));

    it('should exist', function () {
        // Arrange
        // Act
        // Assert
        expect(api).toBeDefined();
    });

    describe('searchRepos()', function () {

        it('should search for repo with query param', function (done) {
            // Arrange
            var expected = 'meh';
            $httpBackend
                .expectGET('someurl/search/repositories?q=hey&')
                .respond(expected);
            // Act
            api.searchRepos({
                q: 'hey'
            })
                .then(function(data) {
                    // Assert
                    expect(data).toBe(expected);
                    done();
                });
            $httpBackend.flush();
        });

        it('should pop toast with 403 message', function (done) {
            // Arrange
            var expected = 'API Rate Limit';
            $httpBackend
                .expectGET('someurl/search/repositories?')
                .respond(403, 'blah blah');
            // Act
            api.searchRepos()
                .then(function(data) {
                    // Assert
                    expect(data).toNotBeDefined();
                }, function(err) {
                    // Assert
                    expect(toastr.error).toHaveBeenCalledWith(expected);
                    done();
                });
            $httpBackend.flush();
        });

        it('should pop toast with generic message', function (done) {
            // Arrange
            var expected = 'Github API error';
            $httpBackend
                .expectGET('someurl/search/repositories?')
                .respond(401, 'blah blah');
            // Act
            api.searchRepos()
                .then(function(data) {
                    // Assert
                    expect(data).toNotBeDefined();
                }, function(err) {
                    // Assert
                    expect(toastr.error).toHaveBeenCalledWith(expected);
                    done();
                });
            $httpBackend.flush();
        });

    });

    describe('getRepo()', function () {

        it('should append repo to url', function (done) {
            // Arrange
            var expected = 'meh';
            $httpBackend
                .expectGET('someurl/repos/hey/there')
                .respond(expected);
            // Act
            api.getRepo({
                repo: 'hey%2Fthere'
            })
                .then(function(data) {
                    // Assert
                    expect(data).toBe(expected);
                    done();
                });
            $httpBackend.flush();
        });

    });

    describe('getIssues()', function () {

        it('should append repo to url and decode param', function (done) {
            // Arrange
            var expected = 'meh';
            $httpBackend
                .expectGET('someurl/search/issues?q=repo:hey/there')
                .respond(expected);
            // Act
            api.getIssues({
                repo: 'hey%2Fthere'
            })
                .then(function(data) {
                    // Assert
                    expect(data).toBe(expected);
                    done();
                });
            $httpBackend.flush();
        });

        it('should append status to url', function (done) {
            // Arrange
            var expected = 'meh';
            $httpBackend
                .expectGET('someurl/search/issues?q=repo:hey/there state:open')
                .respond(expected);
            // Act
            api.getIssues({
                repo: 'hey%2Fthere',
                status: 'open'
            })
                .then(function(data) {
                    // Assert
                    expect(data).toBe(expected);
                    done();
                });
            $httpBackend.flush();
        });

    });

    describe('getContributors()', function () {

        it('should append repo to url and decode param', function (done) {
            // Arrange
            var expected = 'meh';
            $httpBackend
                .expectGET('someurl/repos/hey/there/stats/contributors')
                .respond(expected);
            // Act
            api.getContributors({
                repo: 'hey%2Fthere'
            })
                .then(function(data) {
                    // Assert
                    expect(data).toBe(expected);
                    done();
                });
            $httpBackend.flush();
        });

    });

    describe('getStargazers()', function () {

        it('should append repo to url and decode param', function (done) {
            // Arrange
            var expected = 'meh';
            $httpBackend
                .expectGET('someurl/repos/hey/there/stargazers')
                .respond(expected);
            // Act
            api.getStargazers({
                repo: 'hey%2Fthere'
            })
                .then(function(data) {
                    // Assert
                    expect(data).toBe(expected);
                    done();
                });
            $httpBackend.flush();
        });

    });

});
