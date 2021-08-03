const CopyPlugin = require("copy-webpack-plugin");

var path = require('path');
module.exports = {
  //...
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'public/index.html'
    },
},
  mode: 'development',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "dist" },
      ],
    }),
  ],  
};