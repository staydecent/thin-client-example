import $ from 'jquery'

export default (opts) => {
  const defaultOps = {
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

  opts = {...defaultOps, ...opts}

  const handleRouting = () => {
    const route = window.location.pathname
    if (opts.routes.hasOwnProperty(route)) {
      opts.routes[route]()
    }
  }

  handleRouting()

  // Load partial template from server and update pushState
  const navigate = (url, {checkUrl}) => {
    if (checkUrl && url === window.location.pathname) {
      return
    }
    $.ajax({
      url: url,
      headers: {'X-PJAX': true},
      success: (resp) => {
        $(opts.selector).animate(
          opts.animation.exit,
          opts.animation.duration,
          () => {
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

  return {
    navigate,
    handleRouting
  }

  // Simplified wrapper around history.pushState
  function pushState (url) {
    if (url !== window.location.pathname) {
      window.history.pushState({}, '', url)
    }
  }
}
