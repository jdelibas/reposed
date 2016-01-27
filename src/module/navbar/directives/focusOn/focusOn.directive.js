(function() {
    'use strict';

    angular
        .module('rp.navbar')
        .directive('rpFocusOnShow', focusOnShowDirective);

    focusOnShowDirective.$inject = ['$timeout'];
    function focusOnShowDirective($timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            if (attrs.ngShow) {
                scope.$watch(attrs.ngShow, function(newValue) {
                    if (newValue) {
                        $timeout(function() {
                            element.focus();
                        }, 0);
                    }
                })
            }
            if (attrs.ngHide) {
                scope.$watch(attrs.ngHide, function(newValue) {
                    if (!newValue) {
                        $timeout(function() {
                            element.focus();
                        }, 0);
                    }
                })
            }
        }
    }
})();
