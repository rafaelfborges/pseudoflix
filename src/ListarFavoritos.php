<?php
  require 'ConexaoBD.php';
  
  $pdo = Conexao::getInstance();
  if($pdo != null){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT * FROM favoritos INNER JOIN filmes_series ON favoritos.movie_id = filmes_series.id
                WHERE favoritos.user_id = '$id'";
        }
      }
      $stmt = $pdo->prepare($sql);
      $stmt->execute();
      http_response_code(200);
      echo json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
    } catch(PDOException $e){
      $error[] = $stmt->errorCode();
      http_response_code(403);
      echo json_encode($error);
    }
  }