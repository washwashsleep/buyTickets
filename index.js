/*
 * node modules
 */
var async = require('async');
var CronJob = require('cron').CronJob;

/*
 * setting cron jobs
 */
var job1 = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: function() {
    console.log(5);
  },
  start: false,
  timeZone: "Asia/Taipei"
});

/*
 * start function
 */
var start = function (){
	job1.start();

};

/*
 * start
 */
start();