---
order: 5
title: 控制关闭状态
component: Tag
---

通过 `visible` 属性控制关闭状态。

```JS DEMO
import { Tag, Button } from 'antd';
import React from 'react';

class Demo extends React.Component {
  state = {
    visible: true,
  };

  render() {
    return (
      <div>
        <Tag
          closable
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        >
          Movies
        </Tag>
        <br />
        <Button size="small" onClick={() => this.setState({ visible: !this.state.visible })}>
          Toggle
        </Button>
      </div>
    );
  }
}

export default class extends React.Component {
  render() {
    return <Demo />
  }
}
```
