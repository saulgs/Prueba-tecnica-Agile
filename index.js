var express = require('express');
var path = require('path');
var app = express();

var selectLists = require('./routes/select_lists');
var updChart = require('./routes/update_chart');

/*
 * En los imports esta var selectLists = require('./routes/select_lists')
 * Esto lo que nos permite es segmentar la funcionalidad dependiendo de las rutas
 * asi, no tendremos 188930 posts, otros 213782183 gets para cada pagina que
 * elaboremos en este archivo.
 */

app.use('/', express.static(__dirname + "/public/"));

app.use('/selectLists', selectLists);
app.use('/updChart', updChart);

/*
 * Lo que hace app.use('/selectLists', selectLists) es unir una
 * URL parcial : '/selectLists' con cualquier URL que se encuentre en
 * la variable students que como definimos al inicio, hace referencia a
 * demas rutas en un archivo js.
 * EJEMPLO:
 * En select_lists.js tenemos:
 *   router.post("/holamundo", urlEncodeParser, function(request, response) {
 *   console.log('Hola Mundo!');
 *   }
 * Como vemos esta funcion post es llamada cuando la asignamos a la URL '/holamundo' pero,
 * como la utilizamos para unirla a '/selectLists', en realidad el
 * post lo recibe la URL '/selectLists/holamundo'
 */

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000.');
});