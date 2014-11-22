/*
 * find all collection docs
 */

var async = require('async');
var request = require('request');
var jsdom = require('jsdom');
var iconv = require('iconv-lite');
var fs = require('fs');
var http = require('http');

var models = require('../models');
var libs = require('../libs');

module.exports = function(next) {
	async.waterfall([
			function(cb) {
				models.test.find().toArray(cb);
			},
			function(docs, cb) {
				async.eachLimit(docs, 5, function(doc, callback) {
					console.log(doc);

					var tmpData = {
						person_id: 'R123840258',
						from_station: '100', // 台北,
						to_station: '185', // 高雄,
						getin_date: '2014/12/06-13',
						train_no: '553', // 車次代碼
						order_qty_str: '1', // 張數
						t_order_qty_str: '0',
						n_order_qty_str: '0',
						d_order_qty_str: '0',
						b_order_qty_str: '0',
						z_order_qty_str: '0',
						returnTicket: '0'
					};

					// request({
					// 	url: 'http://railway.hinet.net/coquery.jsp?personId=A191240659&orderCode=955793',
					// 	encoding: null,
					// 	headers: {
					// 		referer: 'http://railway.hinet.net/coquery.htm'
					// 	}
					// }, function(err, res, body) {
					// 	console.log(err);
					// 	console.log(res);
					// 	var str = iconv.decode(new Buffer(body), "big5");
					// 	console.log(str);

					// });


					request.post({
						url: 'http://railway.hinet.net/check_ctno1.jsp',
						encoding: null,
						headers: {
							referer: 'http://railway.hinet.net'
						},
						form: tmpData
					}, function(err, httpResponse, body) {

						if (err) {
							console.log(err);
						}

						var setCookie = httpResponse.headers['set-cookie'].join(';');
						console.log(body);
						var str = iconv.decode(new Buffer(body), "big5");

						libs.captcha.credentials = {
							username: 'SimonSun',
							password: '19880118'
						};

						var file = fs.createWriteStream("file.jpg");
						var getImage = http.get("http://railway.hinet.net/ImageOut.jsp", function(response) {
						  response.pipe(file);
						    file.on('finish', function() {
						      file.close(function(){
								libs.captcha.decodeFile('file.jpg', 10000, function(err, result) {
									// console.log(result.text);
									var url = 'http://railway.hinet.net/order_no1.jsp?randInput=' + result.text + '&person_id=R123840258&getin_date=2014/11/24-01&from_station=100&to_station=185&order_qty_str=1&train_no=553&returnTicket=0';
									// console.log(url);
									// console.log(typeof url);
									request({
										url: url,
										encoding: null,
										headers: {
											referer: 'http://railway.hinet.net/check_ctno1.jsp',
											cookie: setCookie
										}
									},
									function (err, res, body){
										if(err){
											console.log(err);
										}
										// console.log(body);
										var str = iconv.decode(new Buffer(body), "big5");
										console.log(str);
									});
								});
						      });  // close() is async, call cb after close completes.
						    });
						});
					});

					callback()
				}, cb);
			}
		],
		function(err) {
			next(err);
		});
};