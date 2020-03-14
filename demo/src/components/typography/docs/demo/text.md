---
order: 2
title: 文本组件
component: Typography
---

内置不同样式的文本。

```JS DEMO
import { Typography } from 'antd';
import React from 'react';
const { Text } = Typography;

export default class extends React.Component {
    render() {
      return <div>
        <Text>Ant Design</Text>
        <br />
        <Text type="secondary">Ant Design</Text>
        <br />
        <Text type="warning">Ant Design</Text>
        <br />
        <Text type="danger">Ant Design</Text>
        <br />
        <Text disabled>Ant Design</Text>
        <br />
        <Text mark>Ant Design</Text>
        <br />
        <Text code>Ant Design</Text>
        <br />
        <Text underline>Ant Design</Text>
        <br />
        <Text delete>Ant Design</Text>
        <br />
        <Text strong>Ant Design</Text>
      </div>
    }
}
```
