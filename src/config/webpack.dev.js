import {
  getWatchOptions,
  getOutput,
  getDevServer,
  getPerformance,
  getModuleRules,
  getPlugins,
  getResolve,
  getResolveLoader
} from './common';

export default function apply(config) {
  const { appRoot } = config;
  const output = config.output || {};
  const devServer = config.devServer || {};

  return {
    entry: config.entry,
    output: getOutput({ output, appRoot }),
    context: appRoot,
    mode: 'development',
    devtool: 'source-map',
    devServer: getDevServer({ appRoot, devServer, output }),
    module: {
      rules: getModuleRules(config, 'dev')
    },
    plugins: getPlugins(config, 'dev'),
    resolve: getResolve(config),
    resolveLoader: getResolveLoader(config),
    performance: getPerformance(),
    watchOptions: getWatchOptions(),
    externals: config.externals
  };
}
