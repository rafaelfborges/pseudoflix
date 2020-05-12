<?php
require 'ConexaoBD.php';
// Dados recebidos pelo POST
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

$usuario_id = 1; //B.O PRA RESOLVER

$pdo = Conexao::getInstance();
if($pdo != null){
  try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare("INSERT INTO filmes_series(titulo, descricao, url_poster, url_imdb, url_youtube, 
                                      genero, data_lancamento, tipo, usuario_id, data_criacao)
                                      VALUES ('$titulo', '$descricao', '$urlPoster', '$urlImdb', '$urlYoutube', 
                                            '$genero', '$dataLancamento', '$tipo', '$usuario_id', CURRENT_TIMESTAMP)");

    $stmt->execute();
    $result[] = $stmt->rowCount();
    
    http_response_code(201);
    echo json_encode($result);
  } catch(PDOException $e){
    $error[] = $stmt->errorInfo();
    http_response_code(403);
    echo json_encode($error);
  }
}