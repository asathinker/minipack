---
order: 11
title: 三种大小
component: DatePicker
---

三种大小的输入框，若不设置，则为 `default`。


```JS DEMO
import { DatePicker, Radio } from 'antd';
import React from 'react';
const { RangePicker } = DatePicker;

class PickerSizesDemo extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <DatePicker size={size} />
        <br />
        <DatePicker size={size} picker="month" />
        <br />
        <RangePicker size={size} />
        <br />
        <DatePicker size={size} picker="week" />
      </div>
    );
  }
}

export default class extends React.Component {
  render() {
    return <PickerSizesDemo></PickerSizesDemo>
  }
}
```
