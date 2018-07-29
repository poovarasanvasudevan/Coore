angular.module(APP_NAME)

    .directive('includeReplace', function () {
        return {
            require: 'ngInclude',
            restrict: 'A', /* optional */
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    })

    .directive('logo' , function () {
        return {
            templateUrl: '../templates/component/logo.html' ,
            restrict: 'E' ,
            link :function (scope , element , argument) {

            }
        }
    })
    .directive('appHeader', function () {
        return {
            templateUrl: '../templates/component/header.html',
            restrict: 'E',
            link: function (scope, element, argument) {

            }
        }
    })
    .directive('minimalHeader', function () {
        return {
            templateUrl: '../templates/component/minimalHeader.html',
            restrict: 'E',
            link: function (scope, element, argument) {

            }
        }
    })