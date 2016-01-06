'use strict'

var $ = require('jquery')

module.exports = function(opts) {
  var defaultOps = {
    selector: '#pjax',
    routes: {},
    animation: {
      exit: {
        opacity: 0
      },
      preEnter: {
        opacity: 0
      },
      enter: {
        opacity: 1
      },
      duration: 500
    }
  }

  opts = $.extend(defaultOps, opts)

  var handleRouting = function() {
    var route = window.location.pathname
    if (opts.routes.hasOwnProperty(route)) {
      opts.routes[route]()
    }
  }

  handleRouting()

  return {
    navigate: navigate,
    handleRouting: handleRouting
  }

  // Load partial template from server and update pushState
  function navigate(url) {
    $.ajax({
      url: url,
      headers: { 'X-PJAX': true },
      success: function(resp) {
        $(opts.selector).animate(
          opts.animation.exit,
          opts.animation.duration,
          function() {
            $(opts.selector).replaceWith(resp)
            $(opts.selector)
              .css(opts.animation.preEnter)
              .animate(opts.animation.enter, opts.animation.duration)
            pushState(url)
            handleRouting()
          }
        )
      }
    })
  }

  // Simplified wrapper around history.pushState
  function pushState(url) {
    if (url !== window.location.pathname) {
      window.history.pushState({}, '', url)
    }
  }
}
