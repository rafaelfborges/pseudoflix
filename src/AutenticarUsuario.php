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
        $sql = "SELECT nome_completo, email, senha, tipo_usuario FROM usuarios_dados WHERE email = '$email' AND senha = '$senha'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->rowCount();
        if($result == 1){
          session_start();
          $userData = $stmt->fetch();
          $userSession = array(
            "nome" => $userData[0],
            "usuario" => $userData[1],
            "tipoUsuario" => $userData[3],
            "idSessao" => session_id()
          );
          http_response_code(200);
          echo json_encode($userSession);
        } else {
          echo $result;
          http_response_code(401);
        }
      } 
    } catch(PDOException $e){
      $error[] = $stmt->errorCode();
      http_response_code(403);
      echo json_encode($error);
    }
  }