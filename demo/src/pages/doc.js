import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Row, Col } from 'antd';
import CodeBox from '@components/code-box';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-gist.css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import '../.minipack.doc/.minipack.doc';
import './doc.less';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

const { ItemGroup } = Menu;
const { Header, Content, Sider } = Layout;

class Doc extends React.Component {
  state = {
    currentKey: null
  };

  componentDidMount() {
    this._highlight();
  }

  _highlight = () => {
    document.querySelectorAll("code[class*='language-']").forEach(block => {
      hljs.highlightBlock(block);
    });
  };

  render() {
    const components = (window.MINIPACK_DOCS || [])
      .filter(doc => {
        return !doc.demoCode;
      })
      .sort((a, b) => {
        return a.head.order - b.head.order;
      })
      .reduce((total, doc) => {
        const index = total.findIndex(
          item => item.category === doc.head.category
        );
        let group = {
          children: [],
          category: doc.head.category,
          order: doc.head.category == '文档' ? -1 : doc.head.order
        };
        if (index != -1) {
          group = total[index];
        } else {
          total.push(group);
        }
        group.children.push(doc);
        return total;
      }, [])
      .sort((a, b) => {
        return a.order - b.order;
      });

    const currentKey =
      this.state.currentKey === null
        ? components[0].children[0].head.component
        : this.state.currentKey;

    let doc = null;
    (window.MINIPACK_DOCS || []).forEach(d => {
      if (d.head.component === currentKey) {
        doc = d;
      }
    });

    const demos = (window.MINIPACK_DOCS || [])
      .filter(doc => {
        return doc.demoCode && doc.head.component === currentKey;
      })
      .sort((a, b) => {
        return a.head.order - b.head.order;
      });

    return (
      <Layout style={{ height: '100%' }}>
        <Header>
          <div style={{ color: 'white', fontSize: 18 }}>Minipack 思·行</div>
        </Header>
        <Layout>
          <Sider
            width={280}
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              borderRight: '1px solid #f3f3f3',
              background: 'white'
            }}>
            <Menu
              mode='inline'
              selectedKeys={[currentKey]}
              onSelect={({ key }) => {
                this.setState({ currentKey: key }, () => {
                  this._highlight();
                });
              }}
              style={{ height: '100%', borderRight: 0 }}>
              {components.map(item => {
                if (item.category == '文档') {
                  return item.children.map(child => {
                    return (
                      <Menu.Item key={child.head.component}>
                        {child.head.title}
                      </Menu.Item>
                    );
                  });
                }
                return (
                  <ItemGroup key={item.category} title={item.category}>
                    {item.children.map(child => {
                      return (
                        <Menu.Item key={child.head.component}>
                          <span>
                            <span>{child.head.component}</span>
                            <span style={{ paddingLeft: 3 }}>
                              {child.head.title}
                            </span>
                          </span>
                        </Menu.Item>
                      );
                    })}
                  </ItemGroup>
                );
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px', background: 'white' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}>
              <div className='markdown'>
                <h1>
                  {doc.head.category === '文档'
                    ? doc.head.title
                    : doc.head.component + ' ' + doc.head.title}
                </h1>
              </div>
              <div
                className='markdown'
                dangerouslySetInnerHTML={{ __html: doc.rest }}></div>
              {(() => {
                const col = doc.head.col || 2;
                const span = parseInt(24 / col);
                const items = [];
                for (let i = 0; i < col; i++) items.push(i);
                return (
                  <Row gutter={12}>
                    {items.map(item => {
                      const itemDemos = demos
                        .filter((_, index) => index % col === item)
                        .map((demo, i) => {
                          return (
                            <CodeBox
                              key={demo.head.component + demo.head.title + i}
                              title={demo.head.title}
                              description={demo.rest}
                              code={demo.demoCode}
                              style={{ marginBottom: 18 }}
                              createDemoComponent={
                                demo.createDemoComponent
                              }></CodeBox>
                          );
                        });
                      return (
                        <Col key={item} span={span}>
                          {itemDemos}
                        </Col>
                      );
                    })}
                  </Row>
                );
              })()}
              <div
                className='markdown api-container'
                dangerouslySetInnerHTML={{ __html: doc.api }}></div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<Doc></Doc>, document.getElementById('root'));
