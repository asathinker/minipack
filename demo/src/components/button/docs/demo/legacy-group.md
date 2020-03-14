---
order: 99
title: 废弃的 Block 组
component: Button
---

Debug usage

```JS DEMO
import { Button } from 'antd';
import React from 'react';
export default class extends React.Component {
  render() {
    return <div>
      {getGroup({ size: 'small' })}
      {getGroup()}
      {getGroup({ size: 'large' })}
    </div>
  }
}

function getGroup(props) {
  return (
    <div>
      <Button.Group {...props}>
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
      </Button.Group>
    </div>
  );
}
```
