<?php
  require 'database/ConexaoBD.php';

  $pdo = Conexao::getInstance();
  if($pdo != null){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      if(isset($_GET['pesquisar'])) {
        $pesq = $_GET['pesquisar'];
        $sql = "SELECT filmes_series.id AS movie_id, titulo, descricao, url_poster, url_imdb, url_youtube, genero, 
                data_lancamento, tipo, filmes_series.data_atualizacao, filmes_series.data_criacao FROM filmes_series 
                WHERE titulo LIKE '%$pesq%' OR genero LIKE '%$pesq%' OR data_lancamento LIKE '%$pesq%' OR tipo LIKE '%$pesq%'";
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
  