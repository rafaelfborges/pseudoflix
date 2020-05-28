<?php
  require 'ConexaoBD.php';
  
  $pdo = Conexao::getInstance();
  if($pdo != null){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT filmes_series.id AS movie_id, titulo, descricao, url_poster, url_imdb, url_youtube, genero, data_lancamento, 
                     tipo, usuarios_dados.nome_completo AS usuario, filmes_series.data_atualizacao, filmes_series.data_criacao 
                FROM filmes_series INNER JOIN usuarios_dados ON filmes_series.usuario_id = usuarios_dados.id WHERE filmes_series.id = '$id'";
      } else {
        $sql = "SELECT filmes_series.id AS movie_id, titulo, descricao, url_poster, url_imdb, url_youtube, genero, data_lancamento, 
                     tipo, usuarios_dados.nome_completo AS usuario, filmes_series.data_atualizacao, filmes_series.data_criacao 
                FROM filmes_series INNER JOIN usuarios_dados ON filmes_series.usuario_id = usuarios_dados.id ORDER BY data_criacao DESC LIMIT 6";
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