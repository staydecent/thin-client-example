<?php

namespace Acme;

use Gum\Response as Res;

class Helpers {

  public static function tpl($file_name, $vars = array()) {
    $file = 'templates/' . $file_name . '.html';
    $vars['layout'] = function ($name) {
      include 'templates/layout/'.$name.'.html';
    };
    return Res::render($file, $vars);
  }
}
