<?php  
  require 'ConexaoBD.php';
  require 'PHPMailer/PHPMailerAutoload.php';
  date_default_timezone_set('America/Sao_Paulo');
  
  // Dados recebidos pelo POST
  $email = $_POST['email'];
  $senha = $_POST['senha'];
  $nome = $_POST['nomeCompleto'];
  
  //Converte a data dd/mm/yyyy para o formato yyyy/mm/dd
  $dataNasc = implode("-", array_reverse(
    explode("/", $_POST['dataNascimento'])
  ));

  $telefone = $_POST['telefone'];
  $cep = $_POST['cep'];
  $endereco = $_POST['endereco'];
  $numero = $_POST['numero'];
  $complemento = $_POST['complemento'];
  $cidade = $_POST['cidade'];
  $bairro = $_POST['bairro'];

  $pdo = Conexao::getInstance();
  if($pdo != null){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $pdo->prepare("INSERT INTO usuarios_dados(email, senha, nome_completo, data_nascimento, 
                                      telefone, cep, endereco, numero, complemento, cidade, bairro, data_criacao)
                                      VALUES ('$email', '$senha', '$nome', '$dataNasc', '$telefone', 
                                      '$cep', '$endereco', '$numero', '$complemento', '$cidade', '$bairro', CURRENT_TIMESTAMP)");
  
      $stmt->execute();
      $result[] = $stmt->rowCount();
      
      enviarEmailConfirmacao($email);
      http_response_code(201);
      echo json_encode($result);
    } catch(PDOException $e){
      $error[] = $stmt->errorInfo();
      http_response_code(403);
      echo json_encode($error);
    }
  }
  
  function enviarEmailConfirmacao($email) {
    $tituloEmail = "Pseudoflix - Confirmação de Cadastro";
    $message = 'Seu cadastro foi realizado com sucesso! Para confirmar acesse o link: http://localhost/pseudoflix/src/ConfirmarCadastro.php?usuario='.$email.'';

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
    $mail->addAddress($email,'');
    $mail->Subject = $tituloEmail;
    $mail->msgHTML($message);
        
    $mail->send();
  }