<?php
require 'ConexaoBD.php';
// Dados recebidos pelo POST
$user_id = $_POST['###'];
$movie_id = $_POST['###']

$pdo = Conexao::getInstance();
if($pdo != null){
  try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare("INSERT INTO favoritos(user_id, movie_id) 
                                      VALUES ('$user_id', '$movie_id')");

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