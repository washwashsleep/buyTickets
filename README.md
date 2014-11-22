buyTickets
==========

start
=========

node index.js

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