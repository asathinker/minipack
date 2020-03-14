---
order: 3
title: 使用 iconfont.cn
component: Icon
---

对于使用 [iconfont.cn](http://iconfont.cn/) 的用户，通过设置 `createFromIconfontCN` 方法参数对象中的 `scriptUrl` 字段， 即可轻松地使用已有项目中的图标。


```JS DEMO
import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
export default class extends React.Component {
  render() {
    return  <div className="icons-list">
      <IconFont type="icon-tuichu" />
      <IconFont type="icon-facebook" />
      <IconFont type="icon-twitter" />
    </div>
  }
}
```
