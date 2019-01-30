const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        'Components': path.resolve(__dirname, 'src/components'),
        'Views': path.resolve(__dirname, 'src/views')
      }
    }
  }
}
