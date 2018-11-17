const express = require('express');
const app = express();
const PORT = parseInt(process.env.PORT, 10) | 3003;

const bodyParser = require('body-parser');
const request = require('request');
var apiKey = process.env.APIKEY;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.render('index', {weather: null, error: null});
});

app.post('/', (req, res)=>{

    var city = req.body.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'})
        }
        else{
            var weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            }
            else{
                var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

app.listen(PORT, ()=>{
    console.log("server is listenting to ", PORT, " apikey ", apiKey);
});