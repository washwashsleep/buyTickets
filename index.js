/*
 * node modules
 */
var async = require('async');
var CronJob = require('cron').CronJob;

/*
 * loaded models
 */
var models = require('./models');

/*
 * setting cron jobs
 */
var job1 = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: function() {
	console.log(models);
    return;
  },
  start: false,
  timeZone: "Asia/Taipei"
});

var job2 = new CronJob({
  cronTime: '*/10 * * * * *',
  onTick: function() {
    console.log(10);
    return;
  },
  start: false,
  timeZone: "Asia/Taipei"
});

/*
 * start function
 */
var start = function (){
	job1.start();
	job2.start();

};

/*
 * start
 */
start();