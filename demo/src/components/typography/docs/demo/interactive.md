---
order: 3
title: 可交互
component: Typography
---

提供可编辑和可复制等额外的交互能力。

```JS DEMO
import { Typography } from 'antd';
import React from 'react';
const { Paragraph } = Typography;

class Demo extends React.Component {
  state = {
    str: 'This is an editable text.',
  };

  onChange = str => {
    console.log('Content change:', str);
    this.setState({ str });
  };

  render() {
    return (
      <div>
        <Paragraph editable={{ onChange: this.onChange }}>{this.state.str}</Paragraph>
        <Paragraph copyable>This is a copyable text.</Paragraph>
        <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>Replace copy text.</Paragraph>
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
