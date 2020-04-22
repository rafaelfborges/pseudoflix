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
        $sql = "SELECT id, nome_completo, email, senha FROM usuarios_dados WHERE email = '$email' AND senha = '$senha'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
                
        if($stmt->rowCount() == 1){
          session_start();
          $userData = $stmt->fetch();
          $_SESSION['id'] = $userData[0];
          $_SESSION['nome'] = $userData[1];
          $_SESSION['usuario'] = $userData[2];
          $_SESSION['sessionId'] = session_id();
          http_response_code(200);
          header('Location: ../dashboard.html');
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