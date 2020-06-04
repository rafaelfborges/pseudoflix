<?php

require 'database/ConsultaDB.php';
require 'utils/PHPMailer/PHPMailerAutoload.php';
require 'utils/ResponseStatus.php';
require 'utils/ValidarReqPost.php';
date_default_timezone_set('America/Sao_Paulo');

/**
 * ### Módulo de Conteúdos ###
 * De acordo com ação passado por parâmetro, executa o método correspondente.
 */
if(!empty($_GET)){
  switch ($_GET['acao']) {
    case "cadastrar":
      if(verificarExistenciaCamposPost($_POST))
        cadastrarConteudo();
      break;

    case "listar":
      listarConteudo($_GET['limite']);
      break;

    case "listarTudo":
      listarTudo();
      break;
      
    case "listarComId":
      listarConteudoPorId($_GET['id']);
      break;
    
    case "listarPorTipo":
      listarConteudoPorTipo($_GET['tipo'], $_GET['limite']);
      break;

    case "pesquisar":
      pesquisarConteudo($_GET['pesquisar']);
      break;

    default:
      echo "Opção inválida!";
  }
} else {
  $code = 400;
  $msg = "Nenhum dado foi enviado, verifique sua requisição!";
  sendResponseCode($code, $msg);
}

function pesquisarConteudo($pesquisa) {
  $query = "SELECT filmes_series.id AS movie_id, titulo, descricao, url_poster, url_imdb, url_youtube, genero, 
                data_lancamento, tipo, filmes_series.data_atualizacao, filmes_series.data_criacao FROM filmes_series 
                WHERE titulo LIKE '%$pesquisa%' OR genero LIKE '%$pesquisa%' OR data_lancamento LIKE '%$pesquisa%' OR tipo LIKE '%$pesquisa%'";
  
  $result = consultaBanco($query);
  if(!is_array($result)){
    sendResponseCode(200, $result->fetchAll(PDO::FETCH_OBJ));
  } else {
    sendResponseCode(403, $result);
  }
}

function listarConteudoPorTipo($tipoConteudo, $limiteConteudo) {
  $query = "SELECT filmes_series.id AS movie_id, titulo, descricao, url_poster, url_imdb, url_youtube, genero, 
                data_lancamento, tipo, usuarios_dados.nome_completo AS usuario, filmes_series.data_atualizacao, 
                filmes_series.data_criacao FROM filmes_series INNER JOIN usuarios_dados ON 
                filmes_series.usuario_id = usuarios_dados.id WHERE tipo = '$tipoConteudo' LIMIT ".$limiteConteudo;
  
  $result = consultaBanco($query);
  if(!is_array($result)){
    sendResponseCode(200, $result->fetchAll(PDO::FETCH_OBJ));
  } else {
    sendResponseCode(403, $result);
  }
}

function listarConteudoPorId($id) {
  $query = "SELECT filmes_series.id AS movie_id, titulo, descricao, url_poster, url_imdb, url_youtube, genero, 
                    data_lancamento, tipo, usuarios_dados.nome_completo AS usuario, filmes_series.data_atualizacao, 
                    filmes_series.data_criacao FROM filmes_series INNER JOIN usuarios_dados ON 
                    filmes_series.usuario_id = usuarios_dados.id WHERE filmes_series.id = '$id'";
  
  $result = consultaBanco($query);
  if(!is_array($result)){
    sendResponseCode(200, $result->fetch(PDO::FETCH_OBJ));
  } else {
    sendResponseCode(403, $result);
  }
}

function listarConteudo($limiteConteudo){
  $query = "SELECT filmes_series.id AS movie_id, titulo, descricao, url_poster, url_imdb, url_youtube, genero, 
                data_lancamento, tipo, usuarios_dados.nome_completo AS usuario, filmes_series.data_atualizacao, 
                filmes_series.data_criacao FROM filmes_series INNER JOIN usuarios_dados ON 
                filmes_series.usuario_id = usuarios_dados.id ORDER BY data_criacao DESC LIMIT ".$limiteConteudo;
  
  $result = consultaBanco($query);
  if(!is_array($result)){
    sendResponseCode(200, $result->fetchAll(PDO::FETCH_OBJ));
  } else {
    sendResponseCode(403, $result);
  }
}

function listarTudo(){
  $query = "SELECT filmes_series.id AS movie_id, titulo, descricao, url_poster, url_imdb, url_youtube, genero, 
                data_lancamento, tipo, usuarios_dados.nome_completo AS usuario, filmes_series.data_atualizacao, 
                filmes_series.data_criacao FROM filmes_series INNER JOIN usuarios_dados ON 
                filmes_series.usuario_id = usuarios_dados.id ORDER BY data_criacao";

  $result = consultaBanco($query);
  if(!is_array($result)){
    sendResponseCode(200, $result->fetchAll(PDO::FETCH_OBJ));
  } else {
    sendResponseCode(403, $result);
  }
}

function cadastrarConteudo(){
  $titulo = $_POST['titulo'];
  $descricao = $_POST['descricao'];
  $urlPoster = $_POST['urlPoster'];
  $urlImdb = $_POST['urlImdb'];
  $urlYoutube = $_POST['urlYoutube'];
  $genero = $_POST['genero'];
  //Converte a data dd/mm/yyyy para o formato yyyy/mm/dd
  $dataLancamento = implode("-", array_reverse(
    explode("/", $_POST['dataLancamento'])
  ));
  $tipo = $_POST['tipo'];
  $usuario_id = 1; //B.O PRA RESOLVER -> Tem que pegar o id do Admin!
  
  $query = "INSERT INTO filmes_series(titulo, descricao, url_poster, url_imdb, url_youtube, 
                                      genero, data_lancamento, tipo, usuario_id, data_criacao)
                                      VALUES ('$titulo', '$descricao', '$urlPoster', '$urlImdb', '$urlYoutube', 
                                            '$genero', '$dataLancamento', '$tipo', '$usuario_id', CURRENT_TIMESTAMP)";
  
  $result = consultaBanco($query);
  if(is_array($result)){
    if(in_array("1062", $result)) {
      $msg = "Título já cadastrado!";
      sendResponseCode(409, $msg);
    } else {
      sendResponseCode(400, $result);
    }
  } else {
    sendResponseCode(201, $result->rowCount());
  }
}