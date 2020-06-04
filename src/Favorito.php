<?php

require 'database/ConsultaDB.php';
require 'utils/PHPMailer/PHPMailerAutoload.php';
require 'utils/ResponseStatus.php';
require 'utils/ValidarReqPost.php';
date_default_timezone_set('America/Sao_Paulo');

/**
 * ### Módulo de Favoritos ###
 * De acordo com ação passado por parâmetro, executa o método correspondente.
 */
if(!empty($_GET)){
  switch ($_GET['acao']) {
    case "cadastrar":
      if(verificarExistenciaCamposPost($_POST))
        cadastrarFavorito($_POST['usuario'], $_POST['filme']);
      break;

    case "listarPorUsuarioId":
      listarFavoritoPorUsuarioId($_GET['id']);
      break;

    case "verificarFavorito":
      if(verificarExistenciaCamposPost($_POST))
        verificarFavorito($_POST['usuario'], $_POST['filme']);
      break;
    
    case "deletar":
      if(verificarExistenciaCamposPost($_POST))
        deletarFavorito($_POST['usuario'], $_POST['filme']);
      break;
      
    default:
      echo "Opção inválida!";
  }
} else {
  $code = 400;
  $msg = "Nenhum dado foi enviado, verifique sua requisição!";
  sendResponseCode($code, $msg);
}

function deletarFavorito($idUsuario, $idFilme) {
  $query = "DELETE FROM favoritos WHERE user_id = '$idUsuario' AND movie_id = '$idFilme'";
  $result = consultaBanco($query);
  
  if(!is_array($result)){
    sendResponseCode(200, $result->rowCount());
  } else {
    sendResponseCode(403, $result);
  }
}

function verificarFavorito($idUsuario, $idFilme){
  $query = "SELECT * FROM favoritos WHERE user_id = '$idUsuario' AND movie_id = '$idFilme'";
  
  $result = consultaBanco($query);
  if(!is_array($result)){
    sendResponseCode(200, $result->fetch(PDO::FETCH_OBJ));
  } else {
    sendResponseCode(403, $result);
  }
}

function listarFavoritoPorUsuarioId($id) {
  $query = "SELECT favoritos.user_id, favoritos.movie_id, filmes_series.titulo, filmes_series.descricao, 
                    filmes_series.url_poster, filmes_series.url_imdb, filmes_series.url_youtube, filmes_series.genero, 
                    filmes_series.data_lancamento, filmes_series.tipo FROM favoritos INNER JOIN filmes_series ON 
                    favoritos.movie_id = filmes_series.id WHERE favoritos.user_id = '$id'";
  
  $result = consultaBanco($query);
  if(!is_array($result)){
    sendResponseCode(200, $result->fetchAll(PDO::FETCH_OBJ));
  } else {
    sendResponseCode(403, $result);
  }
}

function cadastrarFavorito($idUsuario, $idFilme) {
  $query = "INSERT INTO favoritos(user_id, movie_id) VALUES ('$idUsuario', '$idFilme')";
  
  $result = consultaBanco($query);
  if(is_array($result)){
    if(in_array("1062", $result)) {
      $msg = "Já está favoritado!";
      sendResponseCode(409, $msg);  
    } else {
      sendResponseCode(400, $result); 
    }
  } else {
    sendResponseCode(201, $result->rowCount());
  }
}
