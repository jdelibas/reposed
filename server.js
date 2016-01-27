var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use('/coverage', express.static(__dirname + '/coverage/report-html'));

app.use('/', express.static(__dirname + '/dist'));

// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', function(req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});

app.listen(port, function () {
    console.log('Server started');
});
