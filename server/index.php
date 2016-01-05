<?php
require '../vendor/autoload.php';

use Gum\Route as Route;
use Gum\Response as Res;
use Gum\Request as Req;

use Acme\Helpers as H;

Route::get('/(home|react)?', function($args) {
  $v = 'home';
  if (isset($args[1])) {
    $v = $args[1];
  }
  echo H::tpl($v);
});

// handle 404
if (Route::not_found()) {
  header('HTTP/1.0 404 Not Found');
  echo '404 Not Found';
  exit;
}
