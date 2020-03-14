import React from 'react';
import { Divider, message } from 'antd';
import { CopyOutlined, CodepenOutlined } from '@ant-design/icons';

export default class extends React.Component {
  state = {
    showCode: false
  };
  render() {
    const { description, code, createDemoComponent } = this.props;
    return (
      <div style={{ border: '1px solid #f0f0f0', ...(this.props.style || {}) }}>
        <div style={{ padding: 18 }}>{createDemoComponent()}</div>
        <Divider orientation='left'>{this.props.title}</Divider>
        <div
          className='markdown'
          style={{ padding: '0px 18px' }}
          dangerouslySetInnerHTML={{ __html: description }}></div>
        <div
          style={{
            borderTop: '1px dashed #f0f0f0',
            borderBottom: `${this.state.showCode ? 1 : 0}px solid #f0f0f0`,
            padding: 12,
            textAlign: 'center',
            opacity: 0.7
          }}>
          <CopyOutlined
            style={{ marginRight: 8, cursor: 'pointer' }}
            onClick={() => {
              message.success('拷贝成功');
            }}
          />
          <CodepenOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.setState(({ showCode }) => {
                return {
                  showCode: !showCode
                };
              });
            }}
          />
        </div>
        <div
          className='markdown'
          style={{ padding: '0px 18px', display: this.state.showCode ? 'block' : 'none' }}
          dangerouslySetInnerHTML={{ __html: code }}></div>
      </div>
    );
  }
}
