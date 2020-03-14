---
order: 5
title: 多个按钮组合
component: Button
---

按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到 `Dropdown.Button` 中组合使用。


```JS DEMO
import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
export default class extends React.Component {
  render() {
    return <div>
      <Button type="primary">primary</Button>
      <Button>secondary</Button>
      <Dropdown overlay={menu}>
        <Button>
          Actions <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  }
}

function handleMenuClick(e) {
  console.log('click', e);
}

var menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
```
