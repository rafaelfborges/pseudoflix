<?php

class Conexao {
  public static $instance;

  private function __construct() {
  }

  public static function getInstance() {
    if ( !isset( self::$instance ) ) {
      try {
        $dbname = 'pseudoflix';
        $host = 'localhost';
        $user = 'root';
        $password = '';
        self::$instance = new PDO( 'mysql:dbname='.$dbname.';host='.$host.'', $user, $password );
      } catch (PDOException $error) {
        http_response_code(500);
        echo "Erro! Mensagem: ".$error->getMessage();
      }
    }
    return self::$instance;
  }
}