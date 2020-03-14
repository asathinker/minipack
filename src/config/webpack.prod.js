import {
  getWatchOptions,
  getOutput,
  getPerformance,
  getModuleRules,
  getPlugins,
  getResolve,
  getDevServer,
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
    mode: 'production',
    devServer: getDevServer({ appRoot, devServer, output }),
    module: {
      rules: getModuleRules(config, 'prod')
    },
    plugins: getPlugins(config, 'prod'),
    resolve: getResolve(config),
    resolveLoader: getResolveLoader(config),
    performance: getPerformance(),
    watchOptions: getWatchOptions(),
    externals: config.externals
  };
}
