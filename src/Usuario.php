<?php

switch ($_GET['acao']) {
  case "cadastrarFilme":
    cadastrarFilme();
    break;
    
  case "listarFilme":
    echo "listar filmes...";
    break;
    
  default:
    echo "Opção inválida!";
}

function cadastrarFilme(){
  echo "Cadastrando...";
}