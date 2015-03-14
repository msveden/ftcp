
var featureToggles = require('../controllers/feature-toggles');
var FeatureToggleRepo = require('../data/feature-toggle-repository');

module.exports = function (app) {    
    
    app.get('/api/featuretoggles', featureToggles.getAll);
    app.get('/api/featuretoggles/:id', featureToggles.getById);
    app.put('/api/featuretoggles', featureToggles.update);

    app.get('/*', function(req, res) {
        res.render('../views/index', { title: '' });
    });

};