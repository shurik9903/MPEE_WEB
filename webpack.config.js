module.exports = {
    entry: './WEB/site/view/start/start_page_form.js',
    output: {
        libraryTarget: 'var',
        library: 'FormStart_module',
        path: __dirname + '/WEB/site/',
        filename: 'bundle.js'
    }
  };