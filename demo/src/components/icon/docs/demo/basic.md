---
order: 0
title: 基本用法
component: Icon
---

通过 `@ant-design/icons` 引用 Icon 组件，不同主题的 Icon 组件名为图标名加主题做为后缀，也可以通过设置 `spin` 属性来实现动画旋转效果。


```JS DEMO
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import React from 'react';
export default class extends React.Component {
  render() {
    return <div className="icons-list">
      <HomeOutlined />
      <SettingFilled />
      <SmileOutlined />
      <SyncOutlined spin />
      <SmileOutlined rotate={180} />
      <LoadingOutlined />
    </div>
  }
}
```

<style>
.icons-list > .anticon {
  margin-right: 6px;
  font-size: 24px;
}
</style>
