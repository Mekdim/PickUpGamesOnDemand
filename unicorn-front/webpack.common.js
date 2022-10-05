const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    home: './src/index.js',
    main: './src/App.js',
    profile: './src/pages/ProfilePage.js',
    event: './src/pages/EventPage.js',
    pitch: './src/pages/Pitch.js',
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Css: path.resolve(__dirname, 'src/css/'),
      Images: path.resolve(__dirname, 'src/images/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Pages: path.resolve(__dirname, 'src/pages'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      title: 'Kuaas Inc',
      favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|gif|avif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].bundle.[ext]',
        },
      },
    ],
  },
};
