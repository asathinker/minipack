import React from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default class extends React.Component {
  render() {
    return (
      <div style={{ background: '#ececec', padding: 30 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title='Active'
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix='%'
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title='Idle'
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix='%'
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
