var APP_NAME = "coore"
angular.module(APP_NAME , ['ngAnimate' , 'ngAria' ,'ngMessages' , 'ngMaterial'] ,function($interpolateProvider) {
    $interpolateProvider.startSymbol('[#');
    $interpolateProvider.endSymbol('#]');
})
    .config(function($mdThemingProvider) {

        // $mdThemingProvider.definePalette('amazingPaletteName', {
        //     '50': '0052CC',
        //     '100': '0052CC',
        //     '200': '0052CC',
        //     '300': '0052CC',
        //     '400': '0052CC',
        //     '500': '0052CC',
        //     '600': '0052CC',
        //     '700': '0052CC',
        //     '800': '0052CC',
        //     '900': '0052CC',
        //     'A100': 'ff8a80',
        //     'A200': 'ff5252',
        //     'A400': 'ff1744',
        //     'A700': 'd50000',
        //     'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        //                                         // on this palette should be dark or light
        //
        //     'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        //         '200', '300', '400', 'A100'],
        //     'contrastLightColors': undefined    // could also specify this if default was 'dark'
        // });

        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')

    });
//#0052CC
angular.module(APP_NAME)
    .controller('bodyController' , function ($scope) {

    })

