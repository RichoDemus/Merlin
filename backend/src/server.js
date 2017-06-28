const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8080   ;
app.listen(port, () => {
    console.log('We are live on ' + port);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send(JSON.stringify({message: "Hello World from the backend"}))
});
