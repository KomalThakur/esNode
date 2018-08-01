var express = require('express');
var app = express();
var routes = require('./main/routes');
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});