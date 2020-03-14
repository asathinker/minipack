---
order: 98
title: 后缀图标
component: DatePicker
---

最简单的用法，在浮层中可以选择或者输入日期。


```JS DEMO
import { DatePicker } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import React from 'react';
const smileIcon = <SmileOutlined />;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default class extends React.Component {
  render() {
    return  <div>
      <DatePicker suffixIcon={smileIcon} onChange={onChange} />
      <br />
      <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="month" />
      <br />
      <RangePicker suffixIcon={smileIcon} onChange={onChange} />
      <br />
      <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="week" />
      <br />
      <DatePicker suffixIcon="ab" onChange={onChange} />
      <br />
      <DatePicker suffixIcon="ab" onChange={onChange} picker="month" />
      <br />
      <RangePicker suffixIcon="ab" onChange={onChange} />
      <br />
      <DatePicker suffixIcon="ab" onChange={onChange} picker="week" />
    </div>
  }
}
```
