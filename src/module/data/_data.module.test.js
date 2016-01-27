'use strict';

describe('module rp.data', function () {

    beforeEach(module('rp.data'));

    it('should exist', function () {
        // Arrange
        // Act
        // Assert
        expect(angular.module('rp.data')).toBeDefined();
    });

    it('should have APIURL defined', function () {
        // Arrange
        module(function ($provide) {
            $provide.value('APIURL', 'someurl');
        });
        inject(function ($injector) {
            // Act
            var APIURL = $injector.get('APIURL');
            // Assert
            expect(APIURL).toBe('someurl');
        });
    });

});
