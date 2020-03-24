import loaderUtils from 'loader-utils';
import { MINIPACK_DOC_DIR, MINIPACK_DOC_ENTRY_FILE } from './consts';
import path from 'path';
import { existsSync } from 'fs';
import filePath from './file-path';

/**
 * webpack loader，用于解析markdown doc文档
 *
 * @param {string} content
 * @param {*} map
 * @param {*} meta
 */
export default function docImport(content, map, meta) {
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
