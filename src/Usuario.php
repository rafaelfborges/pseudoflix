<?php
require 'ConexaoBD.php';
require 'PHPMailer/PHPMailerAutoload.php';

date_default_timezone_set('America/Sao_Paulo');
$pdo = Conexao::getInstance();

/**
 * ### Módulo de Usuário ###
 * De acordo com ação passado por parâmetro, executa o método correspondente. 
 */
if(!empty($_GET)){
  switch ($_GET['acao']) {
    case "cadastrar":
      cadastrarUsuario();
      break;

    case "listar":
      echo "listar filmes...";
      break;

    case "atualizar":
      echo "atualizar filmes...";
      break;

    case "deletar":
      echo "deletar filmes...";
      break;

    default:
      echo "Opção inválida!";
  }
} else {
  echo "Nenhum dado foi enviado por parâmetro, verifique sua requisição!";
  http_response_code(400);
}
  
function cadastrarUsuario(){
  echo "Cadastrando...";
}