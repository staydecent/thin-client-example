'use strict'

var $ = require('jquery')
var riot = require('riot')
var pjaxRouter = require('./services/pjaxRouter.js')
var todo = require('./todo.tag')

var router = pjaxRouter({
  routes: {
    '/react': function() {
      riot.mount(todo)
    }
  },
  animation: {
    exit: {
      opacity: 0,
      left: '-100%'
    },
    preEnter: {
      opacity: 0,
      right: '-100%'
    },
    enter: {
      opacity: 1,
      right: '0'
    }
  }
})

// Handle browser navigation (ex. back button)
window.onpopstate = function() {
  router.navigate(window.location.pathname)
}

// Add our event listeners on nav links
$(document).ready(function() {
  console.log('ready', $('.nav > a.button'))
  $('.nav > a.button').on('click', function onNavClick(ev) {
    ev.preventDefault()
    router.navigate(ev.target.getAttribute('href'))
  })
})
