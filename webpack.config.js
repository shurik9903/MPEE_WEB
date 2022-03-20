module.exports = {
    entry: './WEB/site/view/start/start_page_form.js',
    output: {
        libraryTarget: 'umd',
        library: 'FormStart_module',
        path: __dirname + '/WEB/site/',
        filename: 'bundle.js'
    },
    devServer: {
        static : {
          directory : __dirname + '/WEB/'
        },
        port: 3000,
        devMiddleware:{
           publicPath: "https://localhost:3000/",
        },
        hot: "only"
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
  };