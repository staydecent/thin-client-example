<?php
require '../vendor/autoload.php';

use Gum\Route as Route;
use Gum\Response as Res;
use Gum\Request as Req;

use Acme\Helpers as H;

Route::get('/(home|react)?', function($args) {
  $view = isset($args[1]) ? $args[1] : 'home';
  echo H::pjax($view);
});

// handle 404
if (Route::not_found()) {
  header('HTTP/1.0 404 Not Found');
  echo '404 Not Found';
  exit;
}
