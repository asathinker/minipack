---
order: 0
title: 按钮类型
component: Button
---

按钮有四种类型：主按钮、次按钮、虚线按钮和链接按钮。主按钮在同一个操作区域最多出现一次。

```JS DEMO
import { Button } from 'antd';
import React from 'react';

export default class extends React.Component {
  render() {
    return <div>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
    </div>
  }
}
```
