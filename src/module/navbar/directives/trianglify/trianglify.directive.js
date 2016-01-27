(function() {
    'use strict';

    angular
        .module('rp.navbar')
        .directive('rpTrianglify', trianglifyDirective);

    function trianglifyDirective() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var pattern = Trianglify({
                width: element[0].clientWidth,
                height: element[0].clientHeight
            });
            element.css('background-image', 'url(' + pattern.png() + ')');
        }
    }
})();
