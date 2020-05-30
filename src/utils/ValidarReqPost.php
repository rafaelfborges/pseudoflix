<?php

/**
 * Simples classe pra válidar se os dados da requisição via POST estão vazios
 */
function verificarExistenciaCamposPost($dadosRequisicao){
  if(empty($dadosRequisicao)) {
    $msg = "Os dados da sua requisição POST estão vazios! Verifique.";
    sendResponseCode(400, $msg);
    return false;
  }
  return true;
}