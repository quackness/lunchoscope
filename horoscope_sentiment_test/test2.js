//thus api is down:
const aztroJs = require("aztro-js");
//console.log(aztroJs.getTodaysHoroscope);

var request = require('request');
//this api is down, so we will not be usign it
var options = {
  url: 'https://aztro.sameerkumar.website/?sign=aries&day=today',
  method: 'GET'
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
}

request(options, callback);

const URL = 'https://aztro.sameerkumar.website/?sign=aries&day=today';
fetch(URL, {
  method: 'POST'
})
  .then(response => response.json())
  .then(json => {
    const date = json.current_date;
    console.log(date);
  });

// async function runProcess() {
//   const response = await fetch('https://aztro.sameerkumar.website/?sign=aries&day=today');
//   const json = await response.json();
//   console.log(json)
// }

// runProcess();

// let sign = 'aries'
// let property = 'color'

// //Get all horoscope i.e. today's, yesterday's and tomorrow's horoscope
// aztroJs.getAllHoroscope(sign, function (res) {
//   console.log(res)
// })

// //Get today's horoscope
// aztroJs.getTodaysHoroscope(sign, function (res) {
//   console.log(res)
// })

// //Get tomorrow's horoscope
// aztroJs.getTomorrowsHoroscope(sign, function (res) {
//   console.log(res)
// })

// //Get yesterday's horoscope
// aztroJs.getYesterdaysHoroscope(sign, function (res) {
//   console.log(res)
// })

// //Get a perticular property horoscope
// aztroJs.getYesterdaysHoroscope(sign, function (res) {
//   console.log(res)
// }, property)