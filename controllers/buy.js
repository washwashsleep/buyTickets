/*
 * find all collection docs
 */

var async = require('async');
var models = require('../models');

module.exports = function (next){
	async.waterfall([
		function (cb){
			models.test.find().toArray(cb);
		},
		function (docs, cb){
			async.eachLimit(docs, 5, function (doc, callback){
				console.log(doc);
				callback()
			}, cb);
		}
	],
	function (err){
		next(err);
	});
};