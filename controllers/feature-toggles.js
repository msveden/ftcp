var FeatureToggleRepo = require('../data/feature-toggle-repository');

exports.getAll = function(req, res) {
    FeatureToggleRepo().findAll(function (err, results) {
        if (err) {
            res.status(500).send('Something went wrong');
        }
        else {
            res.json(results);
        }
    });
};

exports.getById = function(req, res) {
    FeatureToggleRepo().findById(req.params.id, function (err, results) {
        if (err) {
            res.status(500).send('Something went wrong');
        }
        else {
            res.json(results);
        }
    });
};

function ensureArray(obj) {
    if (Array.isArray(obj)) {
        return obj;
    }
    return [obj];
}

exports.update = function(req, res) {
    var toggles = ensureArray(req.body);
    var successCount = 0;
    var resultCount = 0;
    toggles.forEach(function (toggle) {
        FeatureToggleRepo().update(toggle._id, toggle, function (err, results) {
            console.log(results);
            
            if (results.updatedExisting) {
                successCount++;                
            }
            else {
                res.status(500).send();
                return;
            }

            if (++resultCount == toggles.length) {
                res.status(201).send({ message: 'Put ' + successCount + ' resources'});
            }
        });
    });
};
