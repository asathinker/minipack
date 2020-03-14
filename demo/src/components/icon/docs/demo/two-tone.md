---
order: 1
title: 多色图标
component: Icon
---

双色图标可以通过 `twoToneColor` 属性设置主题色。


```JS DEMO
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import React from 'react';

export default class extends React.Component {
  render() {
    return <div className="icons-list">
      <SmileTwoTone />
      <HeartTwoTone twoToneColor="#eb2f96" />
      <CheckCircleTwoTone twoToneColor="#52c41a" />
    </div>
  }
}

```
