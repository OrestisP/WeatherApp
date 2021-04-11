//////////// IPORT PACKAGES/DEPENDENCIES //////////////////////////
const express = require("express"); // npm install express --save
const https = require('https'); //this is native pkg, no install needed
const bodyParser = require('body-parser');//npm install body-parser


///// CREATE APP //////////////////////////////////////////////////////
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//////////// MY ROUTES //////////////////////////////////////////////////////
app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  //console.log(req.body.city);//city is the html input name
  const query = req.body.city;
  var key = config.WEATHER_API_KEY;
  const apiKey = key;
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response){//this only gets data from external server.
    console.log(response.statusCode);//statusCode will print 200, if no errors
    // console.log(response.headers);
    response.on("data", function(data){
      //console.log(data);//this way we get the data inhex code!SO,convert to Json!
      const weatherData = JSON.parse(data);//opposite: JSON.stringify()
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

      // res.send("<h1>the temperature today is: "+temp+" °C"</h1>);//res refers to the app.get response!
      //                     //ATTENTION: we can only have ONE res.send in a given app method.-
  /////////if we want to send more that one responses, better wrappa them with the WRITE app method:
      res.write("<h1>the temperature today is: "+temp+" &#8451;</h1>");
      res.write("<p>today in "+query+" is gonna be "+description+"</p>");
      res.write("<img src="+imgURL+">");
      res.send();
    });
  });
});


///////////////// CREATE PORT //////////////////////
app.listen(3000, function(){
  console.log("Server started on port 3000");
});
