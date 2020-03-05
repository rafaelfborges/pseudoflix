	
$(document).ready(function(){


	$("#bEnviar").click(function(){
		fLocalComunicaServidor();
	});

});

function fLocalComunicaServidor(){

	$.ajax({
		data: {
			nome: $("#nome").val()
		},
		type: "POST",
		url: 'php/index.php'
	});
}

$(document).ready(function(){


	$("#bAcessar").click(function(){
		
		var senha_hash = $.MD5($('#senha').val());

		alert(senha_hash);

		return false;
	});



});

