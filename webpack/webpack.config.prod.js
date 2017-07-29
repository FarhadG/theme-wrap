import { join } from 'path';
import webpack from 'webpack';
import { assign } from 'lodash';

import { name } from '../package.json';
import baseConfig from './webpack.config.base';

export default assign({}, baseConfig, {
  devtool: 'source-map',
  entry: join(__dirname, '../src/lib'),

  externals: [
    'react',
    'react-dom'
  ],

  output: {
    publicPath: '/',
    filename: `${name}.min.js`,
    path: join(__dirname, '../dist'),
    libraryTarget: 'umd',
    library: name
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false
    })
  ]
});
