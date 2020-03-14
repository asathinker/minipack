---
order: 4
title: 加载中状态
component: Button
---

添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

```JS DEMO
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import React from 'react';
export default  class App extends React.Component {
  state = {
    loading: false,
    iconLoading: false,
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  render() {
    return (
      <div>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <br />
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
          Click me!
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={this.state.iconLoading}
          onClick={this.enterIconLoading}
        >
          Click me!
        </Button>
      </div>
    );
  }
}
```
