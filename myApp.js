let bodyParser = require("body-parser");
let express = require('express');
let app = express();
console.log ("hello World!")


 module.exports = app;


// html and css styling folders
pathToStyles=__dirname
app.use(express.static(pathToStyles));
//return a html file
homePage = __dirname + '/views/index.html';


//if this logger is loaded after the route to the root path, the request never reaches it and the app doesn’t print the logs, because the route handler of the root path terminates the request-response cycle.
app.use(logger);
function logger(req,res, next){
  console.log(req.method +" " +req.path + " - "+ req.ip);
  next()
}

app.use(bodyParser.urlencoded({extended: false}));

// SO REMEMBER THAT ALL THE "APP. USE " must be placed BEFORE all the app.<http method> paramenters
app.get("/",handler);
function handler(req, res){
res.sendFile(homePage);
}


app.get("/json", firstAPI);
function firstAPI(req, res)
{
  javascriptObject={message: "Hello json"};

  if (process.env.MESSAGE_STYLE==="uppercase"){
  
    javascriptObject.message =javascriptObject.message.toUpperCase();

  }
  res.json(javascriptObject);
}

app.get('/now', function(req, res, next){
req.time =new Date().toString()
  next()},
  function(req, res){
    time={time: req.time}
  res.json(time)
})

// this is how to include parameters in a request
app.get("/:word/echo",echoBack);

function echoBack(req, res){
  res.json({ echo:req.params.word})
}

app.get("/name", formatName);
function formatName(req, res){
firstName=req.query.first
lastName=req.query.last
res.json({ "name": firstName + " "+ lastName })
}
app.post("/name", submitName);
function submitName(req, res){
  firstName= req.body.first
  lastName=req.body.last
  res.json({ "name": firstName + " "+ lastName })
}