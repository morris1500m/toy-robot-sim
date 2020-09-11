const path = require('path');
module.exports = {
    "mode": "none",
    "devtool": "inline-source-map",
    "entry": "./src/index.js",
    "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js",
    "libraryTarget": "this",
    "library": "Index",
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    "module": {
        "rules": [
          {
            "test": /\.css$/,
            "use": [
              "style-loader",
              "css-loader"
            ]
          },
          {
            "test": /\.(jpg|png)$/,
            "use": {
              "loader": 'url-loader',
            },
          },
          {
            "test": /\.js$/,
            "exclude": /node_modules/,
            "use": {
              "loader": "babel-loader",
              "options": {
                "presets": [
                  "@babel/preset-env",
                ]
              }
            }
          },
          {
            test: /\.(woff|woff2|ttf)$/,
            use: {
              loader: 'url-loader',
            },
          }
        ]
    }
}