<?php
  require 'ConexaoBD.php';
  
  $pdo = Conexao::getInstance();
  if($pdo != null){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT favoritos.user_id, favoritos.movie_id, filmes_series.titulo, filmes_series.descricao, 
        filmes_series.url_poster, filmes_series.url_imdb, filmes_series.url_youtube, filmes_series.genero, 
        filmes_series.data_lancamento, filmes_series.tipo FROM favoritos INNER JOIN filmes_series ON 
            favoritos.movie_id = filmes_series.id WHERE favoritos.user_id = '$id'";
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