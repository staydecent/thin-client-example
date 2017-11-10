(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("client/app.js", function(exports, require, module) {
'use strict';

var _preact = require('preact');

var _preact2 = _interopRequireDefault(_preact);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _pjaxRouter = require('./services/pjaxRouter');

var _pjaxRouter2 = _interopRequireDefault(_pjaxRouter);

var _Todo = require('./components/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _pjaxRouter2.default)({
  routes: {
    '/react': function react() {
      var node = document.getElementById('Todo');
      _preact2.default.render(_preact2.default.h(_Todo2.default, null), node.parent, node);
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
});

// Handle browser navigation (ex. back button)
window.onpopstate = function () {
  return router.navigate(window.location.pathname);
};

// Add our event listeners on nav links
(0, _jquery2.default)(document).ready(function () {
  return (0, _jquery2.default)('.nav > a.button').on('click', function onNavClick(ev) {
    ev.preventDefault();
    router.navigate(ev.target.getAttribute('href'));
  });
});
});

;require.register("client/components/Todo.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _preact2 = _interopRequireDefault(_preact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var items = [{ title: 'Try out some experimental libraries' }, { title: 'Do we really need vDom?' }, { title: 'Pick of some local raspber ries' }];

exports.default = function () {
  return _preact2.default.h(
    'div',
    null,
    _preact2.default.h(
      'ul',
      null,
      items.map(function (_ref) {
        var title = _ref.title;
        return _preact2.default.h(
          'h3',
          null,
          title
        );
      })
    )
  );
};
});

;require.register("client/services/pjaxRouter.js", function(exports, require, module) {
'use strict';

var $ = require('jquery');

module.exports = function (opts) {
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
  };

  opts = $.extend(defaultOps, opts);

  var handleRouting = function handleRouting() {
    var route = window.location.pathname;
    if (opts.routes.hasOwnProperty(route)) {
      opts.routes[route]();
    }
  };

  handleRouting();

  return {
    navigate: navigate,
    handleRouting: handleRouting

    // Load partial template from server and update pushState
  };function navigate(url) {
    $.ajax({
      url: url,
      headers: { 'X-PJAX': true },
      success: function success(resp) {
        $(opts.selector).animate(opts.animation.exit, opts.animation.duration, function () {
          $(opts.selector).replaceWith(resp);
          $(opts.selector).css(opts.animation.preEnter).animate(opts.animation.enter, opts.animation.duration);
          pushState(url);
          handleRouting();
        });
      }
    });
  }

  // Simplified wrapper around history.pushState
  function pushState(url) {
    if (url !== window.location.pathname) {
      window.history.pushState({}, '', url);
    }
  }
};
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map