module.exports = {
    mode:'production',
    entry: './view/module/index.js',
    output: {
        path: __dirname + '/WEB/',
        filename: 'bundle.js'
    },
    devServer: {
        static : {
          directory : __dirname + '/WEB/'
        },
        port: 6009,
        hot: true
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