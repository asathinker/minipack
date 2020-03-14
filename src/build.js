import yargs from 'yargs';
import applyWebpackDev from './config/webpack.dev';
import applyWebpackProd from './config/webpack.prod';
import getConfig from './util/get-config';
import webpack from 'webpack';

const argv = yargs
  .usage('minipack build')
  .option('mode', {
    alias: 'm',
    type: 'string',
    description: '编译模式：--mode dev 或者 --mode prod',
    default: 'dev'
  })
  .option('watch', {
    alias: 'w',
    type: 'boolean',
    default: false
  })
  .help('h').argv;

function webpackHandler(err, stats) {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }
  const info = stats.toJson();
  if (stats.hasErrors()) {
    return console.error(info.errors);
  }
  console.log(stats.toString({ colors: true, chunk: false }));
}

function runBuild({ cwd, mode, watch }) {
  const config = getConfig(cwd);
  if (config) {
    let webpackConfig = null;
    if (mode == 'dev') {
      webpackConfig = applyWebpackDev(config);
    } else {
      webpackConfig = applyWebpackProd(config);
    }
    const compiler = webpack(webpackConfig);
    if (watch) {
      compiler.watch(webpackConfig.watchOptions, webpackHandler);
    } else {
      compiler.run(webpackHandler);
    }
  }
}

if (require.main === module) {
  console.log(chalk.green('启动编译模式'));
  runBuild({ ...argv, cwd: process.cwd() });
}
