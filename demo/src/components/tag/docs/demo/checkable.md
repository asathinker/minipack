---
order: 3
title: 可选择
component: Tag
---

可通过 `CheckableTag` 实现类似 Checkbox 的效果，点击切换选中效果。

> 该组件为完全受控组件，不支持非受控用法。

```JS DEMO
import { Tag } from 'antd';
import React from 'react';
const { CheckableTag } = Tag;

class MyTag extends React.Component {
  state = { checked: true };

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    return (
      <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
    );
  }
}

export default class extends React.Component {
  render() {
    return <div>
      <MyTag>Tag1</MyTag>
      <MyTag>Tag2</MyTag>
      <MyTag>Tag3</MyTag>
    </div>
  }
}
```
