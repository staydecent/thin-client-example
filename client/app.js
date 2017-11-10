import $ from 'jquery'

import pjaxRouter from './services/pjaxRouter'
import Todo from './components/Todo'

var router = pjaxRouter({
  routes: {
    '/react': () => {
      const node = document.getElementById('Todo')
      Preact.render(<Todo />, node.parent, node)
    }
  },
  animation: {
    duration: 200,
    exit: {
      opacity: 0,
      marginTop: '25px'
    },
    preEnter: {
      opacity: 0,
      marginTop: '25px'
    },
    enter: {
      opacity: 1,
      marginTop: '0px'
    }
  }
})

// Handle browser navigation (ex. back button)
window.onpopstate = () =>
  router.navigate(window.location.pathname)

// Add our event listeners on nav links
$(document).ready(() =>
  $('.nav > a.button').on('click', function onNavClick (ev) {
    ev.preventDefault()
    router.navigate(ev.target.getAttribute('href'))
  })
)
