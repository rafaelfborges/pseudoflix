<?php

require 'database/ConsultaDB.php';
require 'utils/PHPMailer/PHPMailerAutoload.php';
require 'utils/ResponseStatus.php';
require 'utils/ValidarReqPost.php';
date_default_timezone_set('America/Sao_Paulo');

/**
 * ### Módulo de Usuários ###
 * De acordo com ação passado por parâmetro, executa o método correspondente. 
 */
if(!empty($_GET)){
  switch ($_GET['acao']) {
    case "cadastrar":
      if(verificarExistenciaCamposPost($_POST)) 
        cadastrarUsuario();
      break;

    case "autenticar":
      if(verificarExistenciaCamposPost($_POST))
        autenticarUsuario($_POST['email'], $_POST['senha']);
      break;

    case "confirmar":
      confirmarUsuario($_GET['email']);
      break;

    default:
      echo "Opção inválida!";
  }
} else {
  $code = 400;
  $msg = "Nenhum dado foi enviado, verifique sua requisição!";
  sendResponseCode($code, $msg);
}

function confirmarUsuario($email) {
  $query = "SELECT email FROM usuarios_dados WHERE email = '$email'";
  $result = consultaBanco($query);
  
  if($result->rowCount() == 1){
    $query = "UPDATE usuarios_dados SET flag_confirmacao = '1' WHERE email = '$email'";
    $result = consultaBanco($query);
    if(!is_array($result)){
      echo '<html><head><script>
                window.sessionStorage.setItem("confirmacao", "true");
                window.location.href = "../login.html";
            </script></head></html>';
    } else {
      sendResponseCode(403, $result);
    }
  } else {
    sendResponseCode(404, "E-mail não encontrado!");
  }
}

function autenticarUsuario($email, $senha) {
  if(validarFlagConfirmacao($email)){
    $query = "SELECT id, nome_completo, email, senha, tipo_usuario FROM usuarios_dados WHERE email = '$email' AND senha = '$senha'";
    $result = consultaBanco($query);
    
    if(!is_array($result) && $result->rowCount() == 1){
      session_start();
      $userData = $result->fetch();
      $userSession = array(
        "id" => $userData[0],
        "nome" => $userData[1],
        "usuario" => $userData[2],
        "tipoUsuario" => $userData[4],
        "idSessao" => session_id()
      );
      sendResponseCode(200, $userSession);
    } else {
      sendResponseCode(401, "Usuário ou senha inválidos.");
    }
  } else {
    sendResponseCode(401, "Usuário precisa confirmar e-mail!");
  }
}

function validarFlagConfirmacao($email){
  $query = "SELECT flag_confirmacao FROM usuarios_dados WHERE email = '$email'";
  $result = consultaBanco($query);
  
  if(!is_array($result)) {
    $flagConfirmacao = $result->fetch(PDO::FETCH_OBJ)->{'flag_confirmacao'};
    if($flagConfirmacao == 1)
      return true;
  } else {
    sendResponseCode(404, $result);
  }
  return false;
}

function cadastrarUsuario(){
  $email = $_POST['email'];
  $senha = $_POST['senha'];
  $nome = $_POST['nomeCompleto'];
  //Converte a data dd/mm/yyyy para o formato yyyy/mm/dd
  $dataNasc = implode("-", array_reverse(explode("/", $_POST['dataNascimento'])));
  $telefone = $_POST['telefone'];
  $cep = $_POST['cep'];
  $endereco = $_POST['endereco'];
  $numero = $_POST['numero'];
  $complemento = $_POST['complemento'];
  $cidade = $_POST['cidade'];
  $bairro = $_POST['bairro'];
  
  $query = "INSERT INTO usuarios_dados(email, senha, nome_completo, data_nascimento, 
                                      telefone, cep, endereco, numero, complemento, cidade, bairro, data_criacao)
                                      VALUES ('$email', '$senha', '$nome', '$dataNasc', '$telefone', '$cep', 
                                      '$endereco', '$numero', '$complemento', '$cidade', '$bairro', CURRENT_TIMESTAMP)";
  
  
  $result = consultaBanco($query);
  if(is_array($result)){
    if(in_array("1062", $result)) {
      $msg = "Este usuário já existe!";
      sendResponseCode(409, $msg);  
    } else {
      sendResponseCode(400, $result);
    }
  } else {
    sendResponseCode(201, $result->rowCount());
    enviarEmailConfirmacao($email);
  }
}

function enviarEmailConfirmacao($email) {
  $tituloEmail = "Pseudoflix - Confirmação de Cadastro";
  $message = "Seu cadastro foi realizado com sucesso! Para confirmar acesse o link: http://localhost/pseudoflix/src/Usuario.php?acao=confirmar&email=".$email;
 
  try {
    $mail= new PHPMailer;
    $mail->IsSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->SMTPDebug = 0; // 0 = nao mostra o debug, 2 = mostra o debug
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 465;
    $mail->Username = 'pseudoflixpuc@gmail.com';
    $mail->Password = 'Pseudo123';
    $mail->SetFrom('pseudoflixpuc@gmail.com', 'PseudoFlix Inc');
    $mail->addAddress($email);
    $mail->Subject = $tituloEmail;
    $mail->msgHTML($message);
    $mail->send();
  } catch (phpmailerException $error) {
    sendResponseCode(500, $error->getMessage());
  }
}