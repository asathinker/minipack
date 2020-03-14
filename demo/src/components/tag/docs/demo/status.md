---
order: 7
title: 预设状态的标签
component: Tag
---

预设五种状态颜色，可以通过设置 `color` 为 `success`、 `processing`、`error`、`default`、`warning` 来代表不同的状态。

```JS DEMO
import { Tag } from 'antd';
import React from 'react';

export default class extends React.Component {
  render() {
    return  <div>
      <Tag color="success">success</Tag>
      <Tag color="processing">processing</Tag>
      <Tag color="error">error</Tag>
      <Tag color="default">default</Tag>
      <Tag color="warning">warning</Tag>
    </div>
  }
}

```
