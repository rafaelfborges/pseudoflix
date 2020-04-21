<?php
  require 'ConexaoBD.php';

  $email = $_POST['email'];
  $senha = $_POST['senha'];

  $pdo = Conexao::getInstance();
  if($pdo != null){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $stmt = $pdo->prepare("SELECT flag_confirmacao FROM usuarios_dados WHERE email = '$email'");
      $stmt->execute();
      $result = $stmt->fetch(PDO::FETCH_OBJ)->{'flag_confirmacao'};
      if($result == 1){
        $sql = "SELECT email, senha FROM usuarios_dados WHERE email = '$email' AND senha = '$senha'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        
        if($stmt->rowCount() == 1){
          http_response_code(200);
        } else {
          http_response_code(401);
        }
      } 
    } catch(PDOException $e){
      $error[] = $stmt->errorCode();
      http_response_code(403);
      echo json_encode($error);
    }
  }