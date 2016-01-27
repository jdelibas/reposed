'use strict';

describe('controller rp.navbar/navbar', function () {

    var ctrl, $scope, $state, POPULAR;

    beforeEach(module('rp.navbar'));

    beforeEach(inject(function ($rootScope, $controller) {
        $state = jasmine.createSpyObj('$state', ['go']);
        $scope = $rootScope.$new();
        POPULAR = {
            items: [{
                name: 'a'
            }, {
                name: 'b'
            }]
        };
        ctrl = $controller('rp.navbar.controller', {
            $scope: $scope,
            $state: $state,
            POPULAR: POPULAR
        });
    }));

    it('should map names to repoNameList', function () {
        // Arrange
        var expected = ['a', 'b'];
        // Act

        // Assert
        expect($scope.repoNameList).toEqual(expected);
    });

    it('should go to state with search query param', function () {
        // Arrange
        var expected = 'search var';
        // Act
        $scope.searchRepos(expected);
        // Assert
        expect($state.go).toHaveBeenCalledWith('root.search', {
            q: expected
        });
    });

});
