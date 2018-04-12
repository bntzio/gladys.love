const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/components')
    ],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/
      },
      {
        use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.(s*)css$/
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      open: false,
      port: 3000,
      proxy: 'http://localhost:8080'
    })
  ]
}
