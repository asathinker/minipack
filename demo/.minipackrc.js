const path = require('path');

module.exports = {
  entry: 'src/pages/*.js',
  doc: {
    entry: 'src/pages/doc.js',
    dir: 'src/components',
    loaderOptions: { async: true }
  },
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
  resolveAlias: {
    '@components': path.resolve(__dirname, 'src/components')
  }
};
