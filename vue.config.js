const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// module.exports = {
//   lintOnSave: false,
//   chainWebpack: config => {
//     config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
//   },
//   chainWebPack: config =>
//     new CopyWebpackPlugin([
//       {
//         from: path.resolve('./_redirects'),
//         to: './dist/',
//         ignore: ['.*']
//       }
//     ])
// };

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve('./copy'),
          to: './',
          ignore: ['.*']
        }
      ])
    ],
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  }
};
