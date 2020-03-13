	
$(document).ready(function(){


	$("#bSalvar").click(function(){
		//fLocalComunicaServidor();
		comunicarBD();
	});

});

function enviarEmailRecuperacao(){

	$.ajax({
		data: {
			email: $("#email").val(),
		},
		type: "POST",
		url: '../php/enviar-email.php'
	});
}

function comunicarBD(){

	$.ajax({
		data: {
			nome: $("#nome_completo").val(),
			dataNasc: $("#data_nascimento").val(),
			email: $("#email").val(),
			endereco: $("#endereco").val(),
			cep: $("#cep").val(),
			telefone: $("#telefone").val(),
			numCartao: $("#num_cartao").val(),
			digitoVerificador: $("#dig_verific").val(),
			validade: $("#validade").val(),
			usuario: $("#usuario").val(),
			senha: $("#senha").val(),
			confirmarSenha: $("#confirm_senha").val(),
		},
		type: "POST",
		url: '../php/CadastrarUsuario.php'
	});
}