(function () {
    'use strict';

    var module = angular.module('App', ['ngRoute', 'ngResource', 'ngLodash', 'angularMoment']);

    module.config(
        function ($routeProvider, $locationProvider) {
            $routeProvider
            // .when('/', {
            //     title: '',
            //     templateUrl: 'app/views/index.html',
            //     controller: 'indexCtrl'
            // })
            .when('/featuretoggles', {
                templateUrl: 'app/views/featuretoggles.html',
                controller: 'featureTogglesCtrl'
            }); 

            $routeProvider.otherwise({
                redirectTo: '/featuretoggles'
            });

            $locationProvider.html5Mode(true);
        }
    );

    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$window', function ($q, $window) {
            return {
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        $window.location.replace('/login?ReturnUrl=' + $window.location.pathname);
                        return $q.reject(rejection);
                    }
                    return $q.reject(rejection);
                }
            };
        }]);
    });

    module.run(function ($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (!current.$$route) {
                return;
            }
            $rootScope.title = current.$$route.title;
        });
    });

    window.Module = module;
}());
