<?php
/**
 * Sets the response code and reason
 *
 * @param int    $code
 * @param string $reason
 */
function setResponseCode($code, $reason = null) {
  $code = intval($code);

  if (version_compare(phpversion(), '5.4', '>') && is_null($reason))
    http_response_code($code);
  else
    header(trim("HTTP/1.0 $code $reason"));
}