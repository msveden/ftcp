var mongojs = require('mongojs');
var dbConfig = require('../config/db_config');

function getCollection() {
    var db = mongojs(dbConfig.connectionString);
    return db.collection('FeatureToggles');
}

function handleResults(error, results, callback) {
    if(error) callback(error);
    else callback(null, results);
}

function FeatureToggleRepository() {
    return {
        findAll: function(callback) {
            getCollection().find(function(error, results) {
                handleResults(error, results, callback);
            });
        },
        findById: function(id, callback) {
            getCollection().find({_id: id}, function(error, results) {
                handleResults(error, results, callback);
            });
        },
        update: function(id, updatedObject, callback) {
            getCollection().update({_id: id}, updatedObject, function(error, results) {
                handleResults(error, results, callback);
            });
        }
    };
}

module.exports = FeatureToggleRepository;
