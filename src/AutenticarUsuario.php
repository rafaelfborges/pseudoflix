<?php
  require 'ConexaoBD.php';

  $email = $_POST['email'];
  $senha = $_POST['senha'];

  $pdo = Conexao::getInstance();
  if($pdo != null){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $stmt = $pdo->prepare("SELECT * FROM usuarios_dados WHERE email = '$email' AND flag_confirmacao = '1'");
      $stmt->execute();

      if($stmt->rowCount() == 1) {
        $stmt = $pdo->prepare("SELECT * FROM usuarios_dados WHERE email = '$email' AND senha = '$senha'");
        $stmt->execute();
        
        $result[] = $stmt->rowCount();
        http_response_code(201);
        echo json_encode($result);
      }      
    } catch(PDOException $e){
      $error[] = $stmt->errorCode();
      http_response_code(403);
      echo json_encode($error);
    }
  }
?>