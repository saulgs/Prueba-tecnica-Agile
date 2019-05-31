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

var datos = [
{marca: "cereal1", ventas: "1607, 394, 862, 611"},
{marca: "cereal2", ventas: "1567, 1695, 670, 1616"},
{marca: "cereal3", ventas: "160, 285, 1925, 184"},
{marca: "res", ventas: "602, 832, 722, 1313"},
{marca: "pollo", ventas: "1134, 109, 1681, 1079"},
{marca: "cerdo", ventas: "819, 1625, 1983, 1736"},
{marca: "zanahoria", ventas: "636, 1949, 955, 851"},
{marca: "chile", ventas: "183, 1935, 605, 443"},
{marca: "pepino", ventas: "1955, 1105, 1657, 1184"},
{marca: "jean1", ventas: "495, 1453, 151, 1710"},
{marca: "jean2", ventas: "814, 147, 1060, 872"},
{marca: "jean3", ventas: "183, 527, 147, 1688"},
{marca: "camisa1", ventas: "186, 152, 391, 1560"},
{marca: "camisa2", ventas: "1151, 1409, 1811, 1561"},
{marca: "camisa3", ventas: "212, 300, 375, 1905"},
{marca: "calcetin1", ventas: "1992, 348, 787, 950"},
{marca: "calcetin2", ventas: "17, 1168, 992, 612"},
{marca: "calcetin3", ventas: "146, 1814, 1801, 700"},
{marca: "jabon1", ventas: "689, 400, 309, 1375"},
{marca: "jabon2", ventas: "371, 1030, 34, 1584"},
{marca: "jabon3", ventas: "361, 1784, 1867, 627"},
{marca: "dentrifico1", ventas: "819, 825, 628, 963"},
{marca: "dentrifico2", ventas: "211, 1186, 706, 304"},
{marca: "dentrifico3", ventas: "210, 656, 1929, 989"},
{marca: "desodorante1", ventas: "925, 152, 525, 938"},
{marca: "desodorante2", ventas: "368, 211, 567, 1833"},
{marca: "desodorante3", ventas: "68, 944, 1811, 792"}
];

router.use(bodyParser.json());

router.post('/actualizarGrafico', urlEncodeParser, function(req, res){
    var opt = req.body.opcion;

    for(i = 0; i < datos.length; i++){
        if(datos[i].marca == opt){
            res.send(datos[i]);
            break;
        }
    }

});

module.exports = router;