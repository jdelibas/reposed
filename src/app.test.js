'use strict';

describe('angular', function () {

    it('should exist', function () {
        // Arrange
        // Act
        // Assert
        expect(window.angular).toBeDefined();
    });

});

describe('module re-polished', function () {

    it('should exist', function () {
        // Arrange
        // Act
        // Assert
        expect(angular.module('re-polished')).toBeDefined();
    });

});
