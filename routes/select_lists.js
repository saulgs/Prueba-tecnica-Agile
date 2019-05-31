var express = require('express');
var bodyParser = require("body-parser");

/*
 * Creamos una funcion router que exportaremos luego que nos permitira importarla
 * en otros archivos.
 */
var router = express.Router();
var urlEncodeParser = bodyParser.urlencoded({
  extended: false
});

var categorias = [
    {display: "Comida", value: "comida"},
    {display: "Ropa", value: "ropa"},
    {display: "Higiene", value: "higiene"}
];

router.use(bodyParser.json());

router.post('/categorias', urlEncodeParser, function(req, res){

        res.send(categorias);
    
});

router.post('/productos', urlEncodeParser, function(req, res){
    var opt = req.body.opcion;

    switch(opt){
        case 'comida':
            res.send(
                [{display: "Cereales", value: "cereales"},
                 {display: "Carnes", value: "carnes"},
                 {display: "Vegetales", value: "vegetales"}]
            );
            break;
        case 'ropa':
            res.send(
               [{display: "Jeans", value: "jeans"},
                {display: "Camisas", value: "camisas"},
                {display: "Calcetines", value: "calcetines"}]
            );
            break;
        case 'higiene':
            res.send(
               [{display: "Jabones", value: "jabones"},
                {display: "Dentrifico", value: "dentrifico"},
                {display: "Desodorantes", value: "desodorantes"}]
            );
            break;
    }

});

router.post('/marcas', urlEncodeParser, function(req, res){
    var opt = req.body.opcion;

    switch(opt){
        case 'cereales':
            res.send(
                [{display: "Cereal1", value: "cereal1"},
                 {display: "Cereal2", value: "cereal2"},
                 {display: "Cereal3", value: "cereal3"}]
            );
            break;
        case 'carnes':
            res.send(
                [{display: "Res", value: "res"},
                {display: "Pollo", value: "pollo"},
                {display: "Cerdo", value: "cerdo"}]
            );
            break;
        case 'vegetales':
            res.send(
                [{display: "Zanahoria", value: "zanahoria"},
                {display: "Chile", value: "chile"},
                {display: "Pepino", value: "pepino"}]
            );
            break;
        case 'jeans':
            res.send(
                [{display: "Jean1", value: "jean1"},
                 {display: "Jean2", value: "jean2"},
                 {display: "Jean3", value: "jean3"}]
            );
            break;
        case 'camisas':
            res.send(
               [{display: "Camisa1", value: "camisa1"},
                {display: "Camisa2", value: "camisa2"},
                {display: "Camisa3", value: "camisa3"}]
            );
            break;
        case 'calcetines':
            res.send(
               [{display: "Calcetin1", value: "calcetin1"},
                {display: "Calcetin2", value: "calcetin2"},
                {display: "Calcetin3", value: "calcetin3"}]
            );
            break;
        case 'jabones':
            res.send(
                [{display: "Jabon1", value: "jabon1"},
                 {display: "Jabon2", value: "jabon2"},
                 {display: "Jabon3", value: "jabon3"}]
            );
            break;
        case 'dentrifico':
            res.send(
               [{display: "Dentrifico1", value: "dentrifico1"},
                {display: "Dentrifico2", value: "dentrifico2"},
                {display: "Dentrifico3", value: "dentrifico3"}]
            );
            break;
        case 'desodorantes':
            res.send(
               [{display: "Desodorante1", value: "desodorante1"},
                {display: "Desodorante2", value: "desodorante2"},
                {display: "Desodorante3", value: "desodorante3"}]
            );
            break;
    }

});

module.exports = router;