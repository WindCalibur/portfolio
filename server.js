/**
 * server.js
 */
var http        = require('http'),
    express     = require('express'), 
    app         = express(), 
    path        = require('path'), 
    config      = require('./config/config.js')(), 
    cors        = require('cors'),
    bodyParser  = require('body-parser'),
    favicon     = require('serve-favicon');

var whitelist = ['https://www.bowen.com', 
  'http://localhost:80'];
// var corsOptions = {
//   origin: function(origin, callback){
//     var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
//     callback(null, originIsWhitelisted);
//   },
//   exposedHeaders: ['Content-Type', 'Content-Length', "Connection", "Date", 'Access-Control-Allow-Origin', 'Set-Cookie'],
//   credentials: true,
//   methods: ['GET', 'PUT', 'POST']
// };

// express environments
// app.use(cors(corsOptions));
app.use(favicon(__dirname + '/img/favcon.png'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())


// // app.set("ipaddr", config.host); // why was this commented out before?
// app.set("port", config.port);

app.set("ipaddr", config.host);
app.set("port", config.port);

//
// WARNING * * * * * * * * * * * * * * * * * * * * * * * ** * * * * * * *
// YOU MUST REQUIRE LOGIN BEFORE ACCESSING THE DEFAULT EXPRESS PATH
// END OF WARNING * * * * * * * * * * * * * * * * * * * * * * * * * * * *


app.use(express.static(path.join(__dirname, 'public')));

var server = http.Server(app);

server.listen(app.get("port"), function() {
  console.log(config.app.name+" up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

if (process.send) {
  process.send('listening');
};

process.on('SIGINT', function() {
});
