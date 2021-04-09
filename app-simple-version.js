const express = require("express");
const bodyParser = require('body-parser');
const https = require('https'); //this is native pkg, no install needed


const app = express();
//app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req,res){ //dont forget https:// in the beginnign!
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=8dfa7b166e10f92812fb3951d8d32291&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode);//statusCode will print 200, if no errors
    console.log(response.headers);
    response.on("data", function(data){
      //console.log(data);//this way we get the data inhex code!SO,convert to Json!
      const weatherData = JSON.parse(data);//opposite: JSON.stringify()
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

      // res.send("<h1>the temperature today is: "+temp+" °C"</h1>);//res refers to the app.get response!
      //                     //ATTENTION: we can only have ONE res.send in a given app method.-
/////////if we want to send more that one responses, better wrappa them with the WRITE app method:
      res.write("<h1>the temperature today is: "+temp+" C°</h1>");
      res.write("<p>today is gonna be "+description+"</p>");
      res.write("<img src="+imgURL+">");
      res.send();
    });
  });
});

































app.listen(3000, function(){
  console.log("Server started on port 3000");
});
