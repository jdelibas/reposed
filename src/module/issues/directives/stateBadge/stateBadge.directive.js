(function() {
    'use strict';

    angular
        .module('rp.issues')
        .directive('rpStateBadge', stateBadgeDirective);
    /* istanbul ignore next */
    function stateBadgeDirective() {
        var directive = {
            link: link,
            template: '<span class="label label-as-badge">{{ state }}</span>',
            scope: {
                state: '='
            },
            replace: true,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch('state', function () {
                element.removeClass('label-danger label-success');
                if (scope.state === 'open') {
                    return element.addClass('label-success');
                }
                return element.addClass('label-danger');
            });
        }
    }
})();
