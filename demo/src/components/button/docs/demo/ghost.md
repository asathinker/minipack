---
order: 8
title: 幽灵按钮
component: Button
---

幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。

```JS DEMO
import { Button } from 'antd';
import React from 'react';
export default class extends React.Component {
  render() {
    return <div className="site-button-ghost-wrapper">
      <Button type="primary" ghost>
        Primary
      </Button>
      <Button ghost>Default</Button>
      <Button type="dashed" ghost>
        link
      </Button>
      <Button type="link" ghost>
        link
      </Button>
    </div>
  }
}
```
