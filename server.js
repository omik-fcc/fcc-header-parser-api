// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable trust proxy http://expressjs.com/en/guide/behind-proxies.html)
app.enable('trust proxy');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });

  console.log(req.ip);
  console.log(req.headers["user-agent"]);
});


app.get("/api/whoami", function (req, res) {
  var whoHolder = checkWho(req);
  res.json(whoHolder);
});

function checkWho(x) {
  var response = {
    ipaddress: "",
    language: "",
    software: ""
  };
  // do sumzin
  console.log(x.headers);
  console.log(x.ip);
  response.ipaddress = x.ip;
  console.log(x.headers["accept-language"]);
  response.language = x.headers["accept-language"];
  console.log(x.headers["user-agent"]);
  response.software = x.headers["user-agent"];
  return response;
};

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});