(function (module) {

    'use strict';

    module.controller('featureTogglesCtrl',
        ['$scope', '$routeParams', 'FeatureToggle', function ($scope, $routeParams, FeatureToggle) {

            $scope.toggleButtonText = function (featureToggle) {
                return featureToggle.Killswitch ? 'Switch On' : 'Switch Off';
            }

            $scope.featureToggles = FeatureToggle.query(function() {
                // console.log($scope.featureToggles);
              });

            $scope.showFilter = function (featureToggle)
            {
                return ($scope.showInactive && featureToggle.Killswitch) || ($scope.showActive && !featureToggle.Killswitch);
            };

            $scope.pull = function(featureToggle) {
                console.log('pulled: ' + featureToggle._id);
                featureToggle.Killswitch = !featureToggle.Killswitch;
                FeatureToggle.update({ }, featureToggle);
            };

            function init() {
                $scope.showActive = true;
                $scope.showInactive = true;
            }

            init();
            
        }]);

    module.controller('featureToggleDetailsCtrl',
        ['$scope', '$routeParams', 'FeatureToggle', function ($scope, $routeParams, FeatureToggle) {
            $scope.featureToggles = FeatureToggle.query();
            $scope.details = FeatureToggle.get({featureToggleId: $routeParams.featureToggleId}, function(featureToggle) {
                console.log(featureToggle);
            });
        }]);

}(window.Module));
