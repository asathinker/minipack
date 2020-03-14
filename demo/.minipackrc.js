const path = require('path');

module.exports = {
  entry: 'src/pages/*.js',
  docs: 'src/components',
  docLoaderOptions: { async: true },
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
  resolveAlias: {
    '@components': path.resolve(__dirname, 'src/components')
  }
};
