var async = require('async');
var models = require('../models');

module.exports = function (next){
	async.waterfall([
		function (cb){
			models.test.find().toArray(cb);
		},
		function (docs, cb){
			console.log(docs);
			cb();
		}
	],
	function (err){
		next(err);
	});
};