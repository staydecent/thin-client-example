'use strict'

var reqwest = require('reqwest')

module.exports = function(elmId, routes) {
  var handleRouting = function() {
    var route = window.location.pathname
    if (routes.hasOwnProperty(route)) {
      routes[route]()
    }
  }

  handleRouting()

  return {
    navigate: navigate,
    handleRouting: handleRouting
  }

  // Load partial template from server and update pushState
  function navigate(url) {
    reqwest({
      url: url,
      headers: { 'X-PJAX': true },
      success: function(resp) {
        var container = document.getElementById(elmId)
        container.addEventListener("transitionend", function() {
          container.outerHTML = resp
          container.style.opacity = 1
          pushState(url)
          handleRouting()
        }, true)

        container.style.opacity = 0
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

function dispatchCustomEvent(elmId, name, data) {
  if (window.CustomEvent) {
    var event = new CustomEvent(name, {detail: data})
  } else {
    var event = document.createEvent('CustomEvent')
    event.initCustomEvent(name, true, true, data)
  }

  document.getElementById(elmId).dispatchEvent(event)
}
