import yargs from 'yargs';
import WebpackDevServer from 'webpack-dev-server';
import applyWebpackDev from './config/webpack.dev';
import applyWebpackProd from './config/webpack.prod';
import getConfig from './util/get-config';
import webpack from 'webpack';
import { exec } from 'child_process';
import chalk from 'chalk';

const argv = yargs
  .usage('minipack server')
  .option('mode', {
    alias: 'm',
    type: 'string',
    description: '编译模式：--mode dev 或者 --mode prod',
    default: 'dev'
  })
  .help('h').argv;

function runServer({ cwd, mode }) {
  const config = getConfig(cwd);
  if (config) {
    let webpackConfig = null;
    if (mode == 'dev') {
      webpackConfig = applyWebpackDev(config);
    } else {
      webpackConfig = applyWebpackProd(config);
    }
    WebpackDevServer.addDevServerEntrypoints(
      webpackConfig,
      webpackConfig.devServer
    );
    const compiler = webpack(webpackConfig);
    const webpackDevServer = new WebpackDevServer(
      compiler,
      webpackConfig.devServer
    );
    webpackDevServer.listen(webpackConfig.devServer.port, error => {
      if (!error) {
        const url = `http://localhost:${webpackConfig.devServer.port}`;
        switch (process.platform) {
          case 'win32':
            exec(`start ${url}`);
            break;
          default:
            exec(`open ${url}`);
        }
      }
    });
  }
}

if (require.main === module) {
  console.log(chalk.green('启动开发模式'));
  runServer({ ...argv, cwd: process.cwd() });
}
