const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req , res){

  res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req , res){
  console.log(req.body.cityName);

  const city = req.body.cityName;
  const appKey = "44e9acfc7571060e718565a434fc797d";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+appKey;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      // console.log(weatherData);

      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      // console.log(temp);
      // console.log(weatherDescription);

      res.write("<p>the weather is " + weatherDescription+"</p>");
      res.write("<h1>the tempertature is " +temp + " degree celcius</h1>");
      res.write("<img src=" + imgURL +">")
      // res.send("the weather in kharar is "+ temp );
      res.send();
    });
  });

});


app.listen(3000,function(){
  console.log("server is running on port 3000");
});
