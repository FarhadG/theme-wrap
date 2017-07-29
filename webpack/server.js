import { join } from 'path';
import webpack from 'webpack';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';

import { PORT } from '../config/env';
import config from './webpack.config.dev';

const bundler = webpack(config);

browserSync({
  open: false,
  port: PORT,
  ui: { port: PORT + 1 },
  server: {
    baseDir: join(__dirname, '../src/demo'),
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        stats: { colors: true },
        noInfo: true
      }),
      webpackHotMiddleware(bundler),
      historyApiFallback()
    ]
  },
  files: join(__dirname, '../src/*.html')
});
