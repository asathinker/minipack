import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';
import createMock from '../util/mock-proxy';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import chalk from 'chalk';
import { MINIPACK_DOC_DIR, MINIPACK_DOCS_INJECT } from '../util/consts';

function getPostCssLoader(mode) {
  return {
    loader: 'postcss-loader',
    options: {
      plugins: function() {
        return [
          autoprefixer({
            overrideBrowserslist: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9' // React doesn't support IE8 anyway
            ]
          })
        ];
      },
      sourceMap: mode === 'dev'
    }
  };
}

export function getWatchOptions() {
  return {
    aggregateTimeout: 600,
    poll: 1000,
    ignored: ['node_modules/**']
  };
}

export function getOutput({ appRoot, output }) {
  return {
    filename: '[name].bundle.js',
    chunkFilename: 'dynamic/js/[name].[chunkhash].bundle.js',
    path: path.resolve(appRoot, output.path || 'dist'),
    pathinfo: true,
    publicPath: output.publicPath || '/'
  };
}

export function getDevServer({ appRoot, devServer, output }) {
  return {
    contentBase: path.resolve(appRoot, output.path || 'dist'),
    compress: true,
    port: devServer.port || 8000,
    before: app => {
      if (devServer.before) {
        devServer.before(app);
      }
      app.use(createMock(appRoot));
    },
    ...devServer
  };
}

export function getPerformance() {
  return {
    hints: 'warning',
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
    assetFilter: function(assetFilename) {
      return !/\.map$/.test(assetFilename);
    }
  };
}

export function getResolve(config) {
  return {
    alias: {
      ...config.resolveAlias
    },
    modules: ['node_modules', config.appNodeModules],
    extensions: ['.js', '.jsx', '.ts', '.tsx'].concat(
      config.extraResolveExtensions || []
    ),
    mainFields: ['browser', 'module', 'main']
  };
}

export function getResolveLoader(config) {
  return {
    modules: [
      'node_modules',
      config.appNodeModules,
      path.resolve(__dirname, '../../node_modules'),
      path.resolve(__dirname, '../util') //doc-loader
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'].concat(
      config.extraResolveExtensions || []
    ),
    mainFields: ['browser', 'module', 'main']
  };
}

export function getPlugins(config, mode) {
  const plugins = [];
  if (mode === 'prod') {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: 'dynamic/css/[name].[chunkhash].css'
      })
    );
  }
  plugins.push(
    ...[
      new ProgressBarWebpackPlugin({
        format:
          '编译 [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false,
        width: 150
      }),
      new CopyWebpackPlugin([
        {
          from: config.public,
          to: path.resolve(config.output.path, 'public')
        }
      ])
    ]
  );
  if (Array.isArray(config.extraPlugins) && config.extraPlugins.length > 0) {
    plugins.push(...config.extraPlugins);
  }
  return plugins;
}

export function getModuleRules(config, mode) {
  function getBabelOptions() {
    return {
      babelrc: false,
      presets: ['@babel/preset-env', '@babel/preset-react'].concat(
        config.extraBabelPresets || []
      ),
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
      ].concat(config.extraBabelPlugins || []),
      cacheDirectory: true
    };
  }

  return [
    //处理静态文件
    {
      test: /\.(svg|png|jpg|jpeg)$/,
      loader: 'url-loader',
      options: {
        limit: 3 * 1024 + 1, // < 3KB
        name: 'static/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.jsx?$/,
      include: [config.appSrc],
      use: [
        {
          loader: 'babel-loader',
          options: getBabelOptions()
        }
      ]
    },
    {
      test: /\.tsx?$/,
      include: [config.appSrc],
      use: [
        {
          loader: 'babel-loader',
          options: getBabelOptions()
        },
        {
          loader: 'awesome-typescript-loader',
          options: {
            transpileOnly: true
          }
        }
      ]
    },
    {
      test: /\.md$/,
      use: [
        {
          loader: 'babel-loader',
          options: getBabelOptions()
        },
        {
          loader: 'doc-loader',
          options: {
            context: config.appSrc,
            async:
              (config.docLoaderOptions || {}).async === false ? false : true,
            inject:
              (config.docLoaderOptions || {}).inject || MINIPACK_DOCS_INJECT
          }
        }
      ]
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        {
          loader: mode === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName:
                mode === 'dev'
                  ? '[name]__[local]___[hash:base64:5]'
                  : '[hash:base64:5]'
            },
            sourceMap: mode === 'dev'
          }
        },
        getPostCssLoader(mode),
        {
          loader: 'less-loader',
          options: {
            sourceMap: mode === 'dev',
            modifyVars: config.lessModifyVars || {},
            javascriptEnabled: true
          }
        }
      ]
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: mode === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName:
                mode === 'dev'
                  ? '[name]__[local]___[hash:base64:5]'
                  : '[hash:base64:5]'
            },
            sourceMap: mode === 'dev'
          }
        },
        getPostCssLoader(mode)
      ]
    },
    {
      test: /\.less$/,
      include: /node_modules/,
      use: [
        {
          loader: mode === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: mode === 'dev'
          }
        },
        getPostCssLoader(mode),
        {
          loader: 'less-loader',
          options: {
            sourceMap: mode === 'dev',
            modifyVars: config.lessModifyVars || {},
            javascriptEnabled: true
          }
        }
      ]
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [
        {
          loader: mode === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: mode === 'dev'
          }
        },
        getPostCssLoader(mode)
      ]
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    ...(config.extraLoaders || [])
  ];
}
