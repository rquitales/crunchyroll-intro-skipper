const { optimize } = require('webpack');
const { join } = require('path');

module.exports = {
  mode: "production",
  entry: {
    background_script: join(__dirname, 'src/background_script.ts'),
    content_script: join(__dirname, 'src/content_script.ts'),
  },
  output: {
    path: join(__dirname, 'dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
};