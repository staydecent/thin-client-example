// See http://brunch.io for documentation.

exports.paths = {
  watched: ['client'],
  public: 'server/assets'
}

exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!client)/,
      'app.js': /^client/
    }
  },
  stylesheets: {
    joinTo: {
      'app.css': /^client/
    },
    order: {
      before: [
        'client/styles/normalize.css',
        'client/styles/skeleton.css'
      ]
    }
  }
}

exports.plugins = {
  babel: {
    presets: ['es2015', 'react'],
    plugins: [
      'transform-es2015-spread',
      'transform-object-rest-spread',
      ['module-resolver/lib/index.js', {
        'alias': {
          // This will cause require paths starting with `/` to resolve to the
          // `client` directory. i.e. `/app.js` resolves to `client/app.js`.
          '': './client'
        }
      }],
      ['jsx-import/src/index.js', {
        'identifier': 'Preact',
        'moduleName': 'preact'
      }],
      ['transform-react-jsx', {'pragma': 'Preact.h'}]
    ]
  }
}
