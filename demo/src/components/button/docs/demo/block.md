---
order: 10
title: Block 按钮
component: Button
---

`block`属性将使按钮适合其父宽度。

```JS DEMO
import { Button } from 'antd';
import React from 'react';
export default class extends React.Component {
  render() {
    return <div>
        <Button type="primary" block>
          Primary
        </Button>
        <Button block>Default</Button>
        <Button type="dashed" block>
          Dashed
        </Button>
        <Button type="link" block>
          Link
        </Button>
    </div>
  }
}
```
