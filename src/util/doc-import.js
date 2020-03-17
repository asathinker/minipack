import loaderUtils from 'loader-utils';
import md5 from 'js-md5';
import { MINIPACK_DOC_DIR, MINIPACK_DOC_ENTRY_FILE } from './consts';
import path from 'path';
import { writeFileSync, existsSync } from 'fs';
import showdown from 'showdown';
import chalk from 'chalk';
import filePath from './file-path';

//默认doc-loader的options
const defaultOptions = {
  inject: 'MINIPACK_DOCS',
  async: true
};

/**
 * webpack loader，用于解析markdown doc文档
 *
 * @param {string} content
 * @param {*} map
 * @param {*} meta
 */
export default function docLoader(content, map, meta) {
  //获取options
  const options = Object.assign(
    {},
    loaderUtils.getOptions(this) // it is safe to pass null to Object.assign()
  );
  //文件目录
  const resourcePath = this.resourcePath;
  if (
    options.entry &&
    path.normalize(resourcePath).endsWith(path.normalize(options.entry))
  ) {
    const minpackDocFilePath = path.resolve(
      options.context,
      MINIPACK_DOC_DIR,
      MINIPACK_DOC_ENTRY_FILE
    );
    if (existsSync(minpackDocFilePath))
      content = `require('${filePath(minpackDocFilePath)}');\n` + content;
  }
  this.callback(null, content, map, meta);
  return;
}
