<?php

	$nome = $_POST["nome"];
	$dataNasc = $_POST["dataNasc"];
	$email = $_POST["email"];
	$endereco = $_POST["endereco"];
	$cep = $_POST["cep"];
	$telefone = $_POST["telefone"];
	$numCartao = $_POST["numCartao"];
	$digitoVerificador = $_POST["digitoVerificador"];
	$validade = $_POST["validade"];
	$usuario = $_POST["usuario"];
	$senha = $_POST["senha"];

	$conn = mysqli_connect("localhost:3306", "root", "root", "pseudoflix");

echo "insert into tb_dados_usuarios(
	usuario,senha,nome_completo,data_nascimento,telefone,email,endereco,cep,
	numero_cartao,digito_verificador,validade_cartao,
	tipo_assinatura,flag_confirmacao,data_criacao) values('".$usuario."','".$senha."',
	'".$nome."','".$dataNasc."','".$telefone."','".$email."','".$endereco."','".$cep."',
	'".$numCartao."','".$digitoVerificador."','".$validade."',null,null,null)";
	

	mysqli_query($conn, "insert into tb_dados_usuarios(
		usuario,senha,nome_completo,data_nascimento,telefone,email,endereco,cep,
		numero_cartao,digito_verificador,validade_cartao,
		tipo_assinatura,flag_confirmacao,data_criacao) values('".$usuario."','".$senha."',
		'".$nome."','".$dataNasc."','".$telefone."','".$email."','".$endereco."','".$cep."',
		'".$numCartao."','".$digitoVerificador."','".$validade."',null,null,null)");

?>