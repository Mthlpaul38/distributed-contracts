var express = require('express');
var app = express();
var loginController = require('./controller/loginController');
app.set('/view engine','ejs');
app.use(express.static('/public'));
loginController(app);
app.listen(3000);
console.log('Node server running on port 3000');