$(document).ready(function(){
    initSlcCategories()    
});

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

function removerDatos(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.label = 'Numero de ventas';
    });
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [0, 0, 0, 0];
    });
    chart.update();
}

function actualizarDatos(chart, lbl, array_data) {
    chart.data.datasets.forEach((dataset) => {
        dataset.label = 'Numero de ventas de ' + lbl;
    });
    chart.data.datasets.forEach((dataset) => {
        dataset.data = array_data;
    });
    chart.update();
}

