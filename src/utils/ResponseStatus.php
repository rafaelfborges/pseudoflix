<?php
/**
 * Send response status code and return message
 * @param $status
 * @param $msg
 */
function sendResponseCode($status, $msg) {
  $response = [
    'status' => $status, 
    'message' => $msg
  ];

  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  
  echo json_encode($response);
}