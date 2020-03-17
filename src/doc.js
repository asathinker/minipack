import yargs from 'yargs';
import WebpackDevServer from 'webpack-dev-server';
import applyWebpackDev from './config/webpack.dev';
import applyWebpackProd from './config/webpack.prod';
import getConfig from './util/get-config';
import webpack from 'webpack';
import { exec } from 'child_process';
import chalk from 'chalk';
import { MINIPACK_DOC_ENTRY_FILE, MINIPACK_DOC_DIR } from './util/consts';
import { existsSync, unlinkSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import fs from 'fs';
import filePath from './util/file-path';
const argv = yargs
  .usage('minipack doc')
  .option('mode', {
    alias: 'm',
    type: 'string',
    description: '编译模式：--mode dev 或者 --mode prod',
    default: 'dev'
  })
  .help('h').argv;

/**
 * 删除文件夹
 *
 * @param {string} dir
 */
function deleteDirSync(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(function(file, index) {
      var curPath = path.resolve(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

/**
 * 创建doc入口文件
 *
 * @param {string} rootPath
 * @param {array} docs
 */
function createDocEntryFile(rootPath, docs) {
  try {
    if ((docs || []).length == 0) return null;
    const fileContent = (docs || []).reduce((total, doc) => {
      return total + `require('${filePath(doc)}');\n`;
    }, '');
    const docEntryFileDir = path.resolve(rootPath, MINIPACK_DOC_DIR);
    if (existsSync(docEntryFileDir)) {
      deleteDirSync(docEntryFileDir);
    }
    mkdirSync(docEntryFileDir);
    const docEntryFilePath = path.resolve(
      rootPath,
      MINIPACK_DOC_DIR,
      MINIPACK_DOC_ENTRY_FILE
    );
    if (existsSync(docEntryFilePath)) {
      unlinkSync(docEntryFilePath);
    }
    writeFileSync(docEntryFilePath, fileContent);
    return docEntryFilePath;
  } catch (error) {
    console.error(chalk.red(error.message));
  }
  return null;
}

function runDev({ cwd, mode }) {
  const config = getConfig(cwd);
  if (config) {
    const docFilePath = createDocEntryFile(config.appSrc, config.docs);
    if (!docFilePath) {
      return console.error(chalk.red('没有指定任何文档文件！'));
    }
    //config.entry = Object.assign({}, config.entry, { [MINIPACK_DOC_ENTRY_FILE.replace('.js', '')]: docFilePath });
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
  console.log(chalk.green('启动文档模式'));
  runDev({ ...argv, cwd: process.cwd() });
}
