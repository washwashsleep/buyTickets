var mongojs = require('mongojs');
var db = mongojs('mongodb://128.199.223.114:27017/hangee');
var test = db.collection('test');


module.exports = {
	test: test
};