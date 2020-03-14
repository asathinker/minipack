---
order: 9
title: 危险按钮
component: Button
---

在 4.0 之后，危险成为一种按钮属性而不是按钮类型。


```JS DEMO
import { Button } from 'antd';
import React from 'react';
export default class extends React.Component {
  render() {
    return <div>
      <Button type="primary" danger>
        Primary
      </Button>
      <Button danger>Default</Button>
      <Button type="dashed" danger>
        link
      </Button>
      <Button type="link" danger>
        link
      </Button>
  </div>
  }
}
```
