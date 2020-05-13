<?php
  require 'ConexaoBD.php';
  
  $idUser = $_POST['idUsuario'];
  $idMovie = $_POST['idFilme'];
  
  $pdo = Conexao::getInstance();
  if($pdo != null){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sql = "DELETE FROM favoritos WHERE user_id = '$idUser' AND movie_id = '$idMovie'";
      $stmt = $pdo->prepare($sql);
      $stmt->execute();
      http_response_code(200);
      echo json_encode($stmt->rowCount());
    } catch(PDOException $e){
      $error[] = $stmt->errorCode();
      http_response_code(403);
      echo json_encode($error);
    }
  }