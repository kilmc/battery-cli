const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    cli: "./src/cli.js"
  },
  output: {
    path: __dirname+'/dist',
    filename: "[name].js"
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'shebang-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
  ]
}