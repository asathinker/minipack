---
order: 3
title: 日期时间选择
component: DatePicker
---

增加选择时间功能，当 `showTime` 为一个对象时，其属性会传递给内建的 `TimePicker`。

```JS DEMO
import { DatePicker } from 'antd';
import React from 'react';
const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

export default class extends React.Component {
  render() {
    return <div>
      <DatePicker showTime onChange={onChange} onOk={onOk} />
      <br />
      <RangePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        onOk={onOk}
      />
    </div>
  }
}
```
