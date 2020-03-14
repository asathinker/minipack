import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import style from './index.less';

const LazyStatistic = React.lazy(() => import('@components/statistic'));

class Demo extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get('/api/users').then(response => {
      this.setState({ users: response.data });
    });
  }

  render() {
    return (
      <div className={style.container}>
        <h3>mock功能测试</h3>
        {this.state.users.map(user => {
          return (
            <div key={user.id} className={style.user}>
              <img src='/public/images/avatar.png' width={30}></img>
              {`编码：${user.id}，姓名：${user.name}`}
            </div>
          );
        })}
        <div style={{ marginTop: 8, marginBottom: 8, width: 400 }}>
          <h3>异步组件测试</h3>
          <React.Suspense fallback={<div>加载中...</div>}>
            <LazyStatistic></LazyStatistic>
          </React.Suspense>
        </div>
        <div style={{ marginTop: 8 }}>
          <h3>antd测试</h3>
          <Tooltip title='search'>
            <Button type='primary' shape='circle' icon={<SearchOutlined />} />
          </Tooltip>
          <Button type='primary' shape='circle'>
            A
          </Button>
          <Button type='primary' icon={<SearchOutlined />}>
            Search
          </Button>
          <Tooltip title='search'>
            <Button shape='circle' icon={<SearchOutlined />} />
          </Tooltip>
          <Button icon={<SearchOutlined />}>Search</Button>
          <br />
          <Tooltip title='search'>
            <Button shape='circle' icon={<SearchOutlined />} />
          </Tooltip>
          <Button icon={<SearchOutlined />}>Search</Button>
          <Tooltip title='search'>
            <Button type='dashed' shape='circle' icon={<SearchOutlined />} />
          </Tooltip>
          <Button type='dashed' icon={<SearchOutlined />}>
            Search
          </Button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo></Demo>, document.getElementById('root'));
