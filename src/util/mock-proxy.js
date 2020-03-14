import { MINIPACK_MOCK_FILE } from './consts';
import path from 'path';
import { existsSync } from 'fs';

export default function createMock(rootPath) {
  //express中间件写法，具体参考express官网
  return function(req, res, next) {
    const key = req.method + ':' + req.path;
    //获取mock
    const mockFilePath = path.resolve(rootPath, MINIPACK_MOCK_FILE);
    let mockData = null;
    //是否存在mock配置文件
    if (existsSync(mockFilePath)) {
      try {
        //清楚require缓存，保证每次都获取到最新的mock配置文件
        delete require.cache[require.resolve(mockFilePath)];
        //获取mock配置文件
        mockData = require(mockFilePath);
      } catch (err) {}
    }
    //检查对应的请求是否拥有mock数据
    if (mockData && mockData[key]) {
      //如果提供的是一个方法
      if (typeof mockData[key] == 'function') {
        mockData[key](req, res);
      } else {
        //返回json数据
        res.json(mockData[key]);
      }
    } else next(); // 执行下一步
  };
}
