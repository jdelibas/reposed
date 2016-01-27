describe('reposed/root', function() {

    var $rootScope, $state, $injector, apiMock, state = 'root';

    beforeEach(function() {

        module('reposed', function($provide) {
            $provide.value('api', apiMock = {});
        });

        inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;

            $templateCache.put('navbar/navbar.view.html', 'abc');
            $templateCache.put('home/home.view.html', 'abc');
        })
    });

    it('should respond to URL', function() {
        expect($state.href(state)).toEqual('');
    });

    it('should default to child state', function() {
        // Arrange
        apiMock.searchRepos = jasmine.createSpy('searchRepos');
        apiMock.searchRepos.and.returnValue('abc');

        // Act
        $state.go(state);
        $rootScope.$digest();

        // Assert
        expect($state.current.name).toBe('root.home');
    });

    it('should resolve POPULAR', function() {
        // Arrange
        var expected = 'some resolve data';
        apiMock.searchRepos = jasmine.createSpy('searchRepos');
        apiMock.searchRepos.and.returnValue(expected);

        // Act
        $state.go(state);
        $rootScope.$digest();

        // Assert
        expect($injector.invoke($state.current.views['content@'].resolve.POPULAR)).toBe(expected);
    });
});

describe('reposed/root.home', function() {

    var $rootScope, $state, $injector, apiMock, state = 'root.home';

    beforeEach(function() {

        module('reposed', function($provide) {
            $provide.value('api', apiMock = {});
        });

        inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;

            $templateCache.put('navbar/navbar.view.html', 'abc');
            $templateCache.put('home/home.view.html', 'abc');
        })
    });

    it('should respond to URL', function() {
        expect($state.href(state)).toEqual('/');
    });

    it('should be set to correct state', function() {
        // Arrange
        apiMock.searchRepos = jasmine.createSpy('searchRepos');
        apiMock.searchRepos.and.returnValue('abc');

        // Act
        $state.go(state);
        $rootScope.$digest();

        // Assert
        expect($state.current.name).toBe(state);
    });

    it('should resolve POPULAR', function() {
        // Arrange
        var expected = 'some resolve data';
        apiMock.searchRepos = jasmine.createSpy('searchRepos');
        apiMock.searchRepos.and.returnValue(expected);

        // Act
        $state.go(state);
        $rootScope.$digest();

        // Assert
        expect($injector.invoke($state.current.views['content@'].resolve.POPULAR)).toBe(expected);
    });

    it('should resolve LATEST', function() {
        // Arrange
        var expected = 'some resolve data';
        apiMock.searchRepos = jasmine.createSpy('searchRepos');
        apiMock.searchRepos.and.returnValue(expected);

        // Act
        $state.go(state);
        $rootScope.$digest();

        // Assert
        expect($injector.invoke($state.current.views['content@'].resolve.LATEST)).toBe(expected);
    });
});

describe('reposed/root.repo.issues', function() {

    var $rootScope, $state, $injector, apiMock, state = 'root.repo.issues';

    beforeEach(function() {

        module('reposed', function($provide) {
            $provide.value('api', apiMock = {});
        });

        inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;

            $templateCache.put('navbar/navbar.view.html', 'abc');
            $templateCache.put('home/home.view.html', 'abc');
            $templateCache.put('issues/issues.view.html', 'abc');
        })
    });

    it('should respond to URL', function() {
        expect($state.href(state, {repo: 'abc'})).toEqual('/abc/issues/');
    });

});
