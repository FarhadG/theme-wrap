import { join } from 'path';

export default {
  debug: true,
  noInfo: true,
  target: 'web',

  module: {
    loaders: [
      { test: /(\.js|\.jsx)$/, include: join(__dirname, '../src'), loaders: ['babel'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000' },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
      },
      { test: /\.(jpe?g|png|gif)$/i, loaders: ['file'] },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' }
    ]
  }
};
