	
$(document).ready(function(){


	$("#bSalvar").click(function(){
		fLocalComunicaServidor();
	});

});

function fLocalComunicaServidor(){

	$.ajax({
		data: {
			nome: $("#nome").val(),
		},
		type: "POST",
		url: 'php/index.php'
	});
}