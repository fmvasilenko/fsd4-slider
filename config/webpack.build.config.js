const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const libWebpackConfig = require('./webpack.lib.config');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
});

const buildLibWebpackConfig = merge(libWebpackConfig, {
  mode: 'production',
});

module.exports = new Promise((resolve) => {
  resolve([buildWebpackConfig, buildLibWebpackConfig]);
});
