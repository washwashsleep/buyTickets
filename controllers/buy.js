/*
 * find all collection docs
 */

var async = require('async');
var request = require('request');
var jsdom = require('jsdom');
var iconv = require('iconv-lite');
var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var webshot = require('webshot');
var tough = require('tough-cookie');

var models = require('../models');
var libs = require('../libs');

libs.captcha.credentials = {
	username: 'SimonSun',
	password: '19880118'
};

module.exports = function(next) {
	async.waterfall([
			function(cb) {
				models.test.find().toArray(cb);
			},
			function(docs, cb) {

				var j = request.jar();
				var cookie_string;

				async.eachLimit(docs, 1, function(doc, callback) {

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

					request.post({
						url: 'http://railway.hinet.net/check_ctno1.jsp',
						encoding: null,
						jar: j,
						headers: {
							referer: 'http://railway.hinet.net'
						},
						form: tmpData
					}, function(err, httpResponse, body) {

						if (err) {
							console.log(err);
						}

						cookie_string = j.getCookieString('http://railway.hinet.net');
						j.setCookie(request.cookie(cookie_string), 'http://railway.hinet.net');

						console.log(cookie_string);
						console.log('---------------------');

						var str = iconv.decode(new Buffer(body), "big5");

						var file = fs.createWriteStream("file.jpg");
						var getImage = http.get("http://railway.hinet.net/ImageOut.jsp", function(response) {
							response.pipe(file);
							file.on('finish', function() {
								file.close(function() {
									libs.captcha.decodeFile('file.jpg', 3000, function(err, result) {
										console.log(result.text);

										var url = 'http://railway.hinet.net/order_no1.jsp?randInput=' + result.text + '&person_id=R123840258&getin_date=2014/11/24-01&from_station=100&to_station=185&order_qty_str=1&train_no=553&returnTicket=0';
										console.log(cookie_string);
										console.log('貳貳貳貳貳貳貳貳');
										request({
												url: url,
												encoding: null,
												jar: j,
												headers: {
													referer: 'http://railway.hinet.net/check_ctno1.jsp',
													cookie: cookie_string
												}
											},
											function(err, res, body) {
												if (err) {
													console.log(err);
												}

												var QOO = j.getCookieString('http://railway.hinet.net');

												console.log(QOO);
												// console.log('猴子去爬山');
												console.log('---------------------');
												var str = iconv.decode(new Buffer(body), "big5");
												// console.log(str);
												console.log('======================= done ===================');
												callback();
											});
									});
								});
							});
						});
					});
				}, cb);
			}
		],
		function(err) {
			next(err);
		});
};