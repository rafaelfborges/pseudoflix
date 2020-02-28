

$(document).ready(function(){


	$("#bAcessar").click(function(){
		
		var senha_hash = $.MD5($('#senha').val());

		alert(senha_hash);

		return false;
	});



});

