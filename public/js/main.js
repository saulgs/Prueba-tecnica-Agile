$(document).ready(function(){
    initSlcCategories()    
});

//Grafico de barra utilizando Charts.js
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        datasets: [{
            label: 'Numero de ventas',
            data: [0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        responsiveAnimationDuration: 3,
        maintainAspectRatio: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

//Funcion que mete valores en el select list de categoria al iniciar la página
function initSlcCategories(){
    $.ajax({
		url:"/selectLists/categorias",
		method:"POST",
		dataType:"json",
		success:function(respuesta){
            //console.log(respuesta);
            for(let i=0; i<respuesta.length; i++){
                $('#slc-categoria').append(
                    `<option value="${respuesta[i].value}">${respuesta[i].display}</option>`
                );
            }
        },
		error:function(e){
			console.log("Error: " + JSON.stringify(e));
		}
    });
}

//Funcion que al desencadenarse el evento change en el select list de categoria
//hace una peticion AJAX para solicitar datos al backend y meter valores en el select list de producto de acuerdo a la categoria seleccionada
$("#slc-categoria").change(function() {
    var parametro = "opcion=" + $(this).val();

    $('#slc-producto').html('');
    $('#slc-producto').append(`<option disabled selected value> Seleccione </option>`);
    $('#slc-marca').html('');
    $('#slc-marca').append(`<option disabled selected value> Seleccione </option>`);

    removerDatos(myChart);

    $.ajax({
        url:"/selectLists/productos",
        data:parametro,
		method:"POST",
		dataType:"json",
		success:function(respuesta){
            for(let i=0; i<respuesta.length; i++){
                $('#slc-producto').append(
                    `<option value="${respuesta[i].value}">${respuesta[i].display}</option>`
                );
            }
        },
		error:function(e){
			console.log("Error: " + JSON.stringify(e));
		}
    });

});

//Funcion que al desencadenarse el evento change en el select list de producto
//hace una peticion AJAX para solicitar datos al backend y meter valores en el select list de marca de acuerdo al producto seleccionado
$("#slc-producto").change(function() {
    var parametro = "opcion=" + $(this).val();

    $.ajax({
        url:"/selectLists/marcas",
        data:parametro,
		method:"POST",
		dataType:"json",
		success:function(respuesta){
            $('#slc-marca').html('');
            $('#slc-marca').append(`<option disabled selected value> Seleccione </option>`);
            for(let i=0; i<respuesta.length; i++){
                $('#slc-marca').append(
                    `<option value="${respuesta[i].value}">${respuesta[i].display}</option>`
                );
            }
        },
		error:function(e){
			console.log("Error: " + JSON.stringify(e));
		}
    });

});

//Funcion que al desencadenarse el evento change en el select list de marca
//hace una peticion AJAX para solicitar datos al backend y mostrar los datos estadisticos en el grafico de barras que se visualiza en la pagina de acuerdo al valor seleccionado
$("#slc-marca").change(function() {
    var parametro = "opcion=" + $(this).val();
    

    $.ajax({
        url:"/updChart/actualizarGrafico",
        data:parametro,
		method:"POST",
		dataType:"json",
		success:function(respuesta){
            //console.log(respuesta);
            var array = JSON.parse("[" + respuesta.ventas + "]");
            //console.log(array);
            actualizarDatos(myChart, respuesta.marca, array);
        },
		error:function(e){
			console.log("Error: " + JSON.stringify(e));
		}
    });

});

//Funcion que remueve los datos estadisticos actuales del grafico de barra y los sobreescribe con datos iniciales
function removerDatos(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.label = 'Numero de ventas';
    });
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [0, 0, 0, 0];
    });
    chart.update();
}

//Funcion que actualiza los datos del grafico a nuevos datos estadisticos
function actualizarDatos(chart, lbl, array_data) {
    chart.data.datasets.forEach((dataset) => {
        dataset.label = 'Numero de ventas de ' + lbl;
    });
    chart.data.datasets.forEach((dataset) => {
        dataset.data = array_data;
    });
    chart.update();
}

