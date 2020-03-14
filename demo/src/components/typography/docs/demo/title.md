---
order: 1
title: 标题组件
component: Typography
---

展示不同级别的标题。

```JS DEMO
import { Typography } from 'antd';
import React from 'react';
const { Title } = Typography;

export default class extends React.Component {
    render() {
      return <div>
        <Title>h1. Ant Design</Title>
        <Title level={2}>h2. Ant Design</Title>
        <Title level={3}>h3. Ant Design</Title>
        <Title level={4}>h4. Ant Design</Title>
      </div>
    }
}
```
