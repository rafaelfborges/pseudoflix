<?php
require 'ConexaoBD.php';

function consultaBanco($query){
  $pdo = Conexao::getInstance();

  if(!is_null($pdo)){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $pdo->prepare($query);
      $stmt->execute();
      return $stmt;
    } catch(PDOException $error){
      return $error->errorInfo;
    }
  }
  return null;
}