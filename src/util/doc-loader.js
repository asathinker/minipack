import loaderUtils from 'loader-utils';
import md5 from 'js-md5';
import { MINIPACK_DOC_DIR } from './consts';
import path from 'path';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import showdown from 'showdown';
import chalk from 'chalk';
import filePath from './file-path';
//默认doc-loader的options
const defaultOptions = {
  inject: 'MINIPACK_DOCS',
  async: true
};

/**
 * 读取文档head
 * @param {string} content
 * @example
 *
 * ---
 * category:通用
 * order:0
 * component:Button
 * ---
 *
 * {
 *    category: "通用",
 *    order: 0,
 *    component: "Button"
 * }
 */
function readHead(content) {
  const regex = /^\-\-\-\s*[\r\n]+(([a-zA-Z]+:.*[\r\n]+)*)\-\-\-\s*[\r\n]+/;
  const matchItems = content.match(regex);
  const headObject = {};
  if (matchItems && matchItems.length > 0) {
    let head = matchItems[1];
    while (head.length > 0) {
      const headItemRegex = /^([a-zA-Z]+):([\s\S]*?)[\r\n]+/;
      const headMatchItems = head.match(headItemRegex);
      if (headMatchItems && headMatchItems.length > 0) {
        Object.assign(headObject, {
          [headMatchItems[1]]: headMatchItems[2].trim()
        });
        head = head.replace(headItemRegex, '');
      } else break;
    }
  }
  return {
    head: headObject,
    rest: content.replace(regex, '')
  };
}

/**
 * 读取文档API
 * @param {string} content
 * @example
 *
 * ## API
 * 这里填写api文档信息
 */
function readAPI(content) {
  const regex = /##\s+API\s*[\r\n]+[\s\S]*/;
  const matchItems = content.match(regex);
  return {
    api: matchItems && matchItems.length > 0 ? matchItems[0] : null,
    rest: content.replace(regex, '')
  };
}

/**
 * 读取文档Demo代码块
 * @param {string} content
 * @example
 *
 * ```JS DEMO
 * import React from 'react';
 *
 * export default class extends React.Component {
 *    render() {
 *        return <div>Hello World</div>;
 *    }
 * }
 * ```
 */
function readDemoCode(content) {
  const regex = /```JS\s+DEMO\s*[\r\n]+([\s\S]*)```/;
  const matchItems = content.match(regex);
  return {
    code: matchItems && matchItems.length > 0 ? matchItems[1] : null,
    rest: content.replace(regex, '')
  };
}

/**
 * webpack loader，用于解析markdown doc文档
 *
 * @param {string} content
 * @param {*} map
 * @param {*} meta
 */
export default function docLoader(content, map, meta) {
  //获取doc-loader的options
  const options = Object.assign(
    {},
    defaultOptions,
    loaderUtils.getOptions(this) // it is safe to pass null to Object.assign()
  );
  //doc文档地址
  const resourcePath = this.resourcePath;
  //doc-loader产生的文件的输出根目录
  const context = options.context;
  //获取文档头信息
  const head = readHead(content);
  //获取文档接口信息
  const api = readAPI(head.rest);
  //获取文档代码块
  const code = readDemoCode(api.rest);
  //其他文档内容
  const rest = code.rest;
  let codePath = '';
  //生成代码块单独的文件
  if (code.code) {
    //如果含有代码块，生成独立的代码块文件
    try {
      const codeFilePath = path.resolve(
        context,
        MINIPACK_DOC_DIR,
        md5(resourcePath) + '.js'
      );
      let originalFileCotent = '';
      if (existsSync(codeFilePath)) {
        originalFileCotent = readFileSync(codeFilePath).toString('UTF-8');
      }
      if (originalFileCotent != code.code) {
        //把code写入到文件中
        writeFileSync(codeFilePath, code.code);
      }
      //记录代码块路径
      codePath = codeFilePath;
    } catch (error) {
      console.error(chalk.red(error.message));
    }
  }
  //markdown转换工具
  const converter = new showdown.Converter({ tables: true });
  //输入的目标文件对象信息
  const docObject = {
    head: head.head,
    api: converter.makeHtml(api.api),
    demoCode: code.code
      ? converter.makeHtml('```js\n' + code.code + '\n```')
      : null,
    rest: converter.makeHtml(rest),
    createDemoComponent: codePath ? '__createDemoComponent__' : undefined
  };

  let targetContent = "import React from 'react';\n";
  if (codePath && options.async !== true) {
    targetContent += `import __DemoComponent__ from '${filePath(codePath)}';\n`;
  }
  //docs注入到全局环境中
  targetContent += `window['${options.inject}'] = window['${options.inject}'] || []; \n`;
  targetContent += `window['${options.inject}'].push(${JSON.stringify(
    docObject
  )});\n`;
  if (codePath) {
    let __createDemoComponent__ = '';
    //异步加载demo代码模式
    if (options.async === true) {
      __createDemoComponent__ = `function() {
            return React.createElement(React.Suspense, {
                fallback: React.createElement('div', {children:'正在加载中...'}),
                children: React.createElement(React.lazy(() => import('${filePath(
                  codePath
                )}')))
            });
        }`;
    } else {
      //同步模式
      __createDemoComponent__ = `function() {
            return React.createElement(__DemoComponent__);
        }`;
    }

    targetContent = targetContent.replace(
      '"__createDemoComponent__"',
      __createDemoComponent__
    );
  }
  this.callback(null, targetContent, map, meta);
  return; // always return undefined when calling callback()
}
