var express = require('express');
var path = require('path');
var app = express();

var selectLists = require('./routes/select_lists');
var updChart = require('./routes/update_chart');

app.use('/', express.static(__dirname + "/public/"));


app.use('/selectLists', selectLists);
app.use('/updChart', updChart);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000.');
});