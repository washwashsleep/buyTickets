buyTickets
==========

Taiwan train ticket automatic buying system.

Deal a date for get Taiwan train ticket by automatic, make your time free.

Requirement
===========

 * node / io.js
 * npm
 * mongoDB


start
=========

```js
npm i
npm start
```

 * [exma-square.co](http://exma-square.co/)

captcha usage
=====================

```js
libs.captcha.credentials = {
  username: 'SimonSun',
  password: '19880118'
};

libs.captcha.decodeUrl('http://railway.hinet.net/ImageOut.jsp?pageRandom=2', 10000, function(err, result) {
	console.log(result.text);
});
```

LICENSE
========

MIT

About us
==============

We are [exma-square.co](http://exma-square.co/), a web developer team. Make you product good and make a better product, if you have any case job, requirement, please [contact us](http://exma-square.co/)

 * [exma-square.co](http://exma-square.co/)