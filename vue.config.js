const path = require('path')

module.exports = {
  publicPath: '/vue-forum',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        Components: path.resolve(__dirname, 'src/components'),
        Router: path.resolve(__dirname, 'src/router'),
        Store: path.resolve(__dirname, 'src/store'),
        Views: path.resolve(__dirname, 'src/views')
      }
    }
  }
}
