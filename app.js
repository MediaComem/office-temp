const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config()

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/t', function (req, res) {
	res.json({test:process.env.MOTHER_USER})
})

app.get('/', function (req, res) {
	var url = 'https://apis.sen.se/v2/feeds/xGkV6BYWpTOKZmuUUyYUViAHtMZYOeCO/events/?limit=1'
	request(url,{'auth': {'user': process.env.MOTHER_USER,'pass': process.env.MOTHER_PWD}}, function (error, response, body) {
		console.log(response)
		console.log("****")
		console.log(body)
		var obj = JSON.parse(body);
    console.log( obj.objects[0].data.centidegreeCelsius );
    var temperature = obj.objects[0].data.centidegreeCelsius;
    temperature = temperature/100
    console.log(temperature)
    var dateTook = obj.objects[0].dateEvent
    res.json({ temperature: temperature, tookAt: dateTook });
	})
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})