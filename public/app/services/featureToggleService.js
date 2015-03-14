(function (module) {

    'use strict';

    module.factory('FeatureToggle', ['$resource',
    function($resource){
        return $resource('/api/featuretoggles/:featureToggleId', {}, {            
            query: {method:'GET', params:{featureToggleId:'@featureToggleId'}, isArray:true},
            update: { method:'PUT' }
        });
    }]);

}(window.Module));
