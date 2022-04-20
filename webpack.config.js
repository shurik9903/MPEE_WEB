const path = require("path");
const webpack = require("webpack");

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
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
  },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]],
                plugins: [
                  ["@babel/plugin-transform-runtime", {
                    "regenerator": true
                  }]
                ] 
              }
            }
          },
          {
            test: /\.css$/, 
            use: [ 'style-loader', 'css-loader' ] 
          }
        ]
      }
  };