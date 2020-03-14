---
order: 4
title: 热门标签
component: Tag
---

选择你感兴趣的话题。

```JS DEMO
import { Tag } from 'antd';
import React from 'react';
const { CheckableTag } = Tag;

const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];

class HotTags extends React.Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <div>
        <span style={{ marginRight: 8 }}>Categories:</span>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

export default class extends React.Component {
  render() {
    return <HotTags />
  }
}

```
