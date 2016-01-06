var reqwest = require('reqwest')
var riot = require('riot')
var todo = require('./todo.tag')
riot.mount(todo)

// Add our event listeners on nav links
var navLinks = document.querySelectorAll('.nav > a.button')
for (var i = 0; i < navLinks.length; ++i) {
  navLinks[i].addEventListener('click', onNavClick)
}

// User navigation (ex. browser back button)
window.onpopstate = function() {
  navigate(window.location.pathname)
}

// User click event on nav links
function onNavClick(ev) {
  ev.preventDefault()
  navigate(ev.target.getAttribute('href'))
}

// Load partial template from server and update pushState
function navigate(url) {
  reqwest({
    url: url,
    headers: { 'X-PJAX': true },
    success: function(resp) {
      document.getElementById('pjax').outerHTML = resp
      pushState(url)
    }
  })
}

// Simplified wrapper around history.pushState
function pushState(url) {
  if (url !== window.location.pathname) {
    window.history.pushState({}, '', url)
  }
}
