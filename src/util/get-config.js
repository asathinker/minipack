import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { MINIPACK_FILE } from './consts';
import glob from 'glob';
import chalk from 'chalk';

export default function getConfig(rootPath, docMode = false) {
  const minpackFilePath = path.resolve(rootPath, MINIPACK_FILE);
  if (existsSync(minpackFilePath)) {
    const config = require(minpackFilePath);
    if (config) {
      //设置app根目录
      config.appRoot = rootPath;
      //代码目录
      config.appSrc = path.resolve(rootPath, 'src');
      //公共资源目录
      config.public = path.resolve(rootPath, 'public');
      //app node_modules
      config.appNodeModules = path.resolve(rootPath, 'node_modules');
      //别名
      config.resolveAlias = config.resolveAlias || {};
      //获取entry
      if (!config.entry && !docMode) {
        console.error(chalk.red('请设置入口文件entry!'));
        return;
      }
      if (typeof config.entry == 'string' && config.entry.length > 0) {
        //解析所有要编译的文件
        const files = glob.sync(config.entry, {
          cwd: rootPath
        });
        //把entry转化为对象形式
        config.entry = files.reduce((total, file) => {
          return {
            ...total,
            [path.parse(file).name]: path.resolve(rootPath, file)
          };
        }, {});
      } else {
        if (!docMode) {
          console.error(chalk.red('entry只能是字符串形式!'));
          return;
        }
      }
      if (
        config.doc &&
        typeof config.doc.dir === 'string' &&
        config.doc.dir.length > 0
      ) {
        //解析docs目录下面所有的doc文件
        const files = glob.sync(path.resolve(config.doc.dir, '**/*.md'), {
          cwd: rootPath
        });
        //把docs转化为对象形式
        config.docs = files.reduce((total, file) => {
          return [...total, path.resolve(rootPath, file)];
        }, []);
      }
      //output默认设置
      config.output = config.output || {};
      if (!config.output.path) {
        config.output.path = 'dist';
      }
      if (!config.output.publicPath) {
        config.output.publicPath = '/';
      }
    }
    return config;
  } else {
    console.error(chalk.red('配置文件' + minpackFilePath + '不存在'));
  }
}
