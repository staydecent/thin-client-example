'use strict'

var riot = require('riot')
var pjaxRouter = require('./services/pjaxRouter.js')
var todo = require('./todo.tag')

var router = pjaxRouter('pjax', {
  '/react': function() {
    riot.mount(todo)
  }
})

// Handle browser navigation (ex. back button)
window.onpopstate = function() {
  router.navigate(window.location.pathname)
}

// Add our event listeners on nav links
var navLinks = document.querySelectorAll('.nav > a.button')
for (var i = 0; i < navLinks.length; ++i) {
  navLinks[i].addEventListener('click', onNavClick)
}

// User click event on nav links
function onNavClick(ev) {
  ev.preventDefault()
  router.navigate(ev.target.getAttribute('href'))
}
