import React, { Component, Fragment } from 'react';
import TabBar from '../../components/TabBar';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import styles from './index.less';
import { Tabs } from 'antd';
import { PullToRefresh } from 'antd-mobile';
import ReactDOM from 'react-dom';

const { TabPane } = Tabs;

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

export default
@connect(state => {
  return {
    isLogin: state.user.isLogin,
  };
}, null)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          title: '全部',
          data: {},
        },
        {
          title: '旅行',
          data: {},
        },
        {
          title: '丽人',
          data: {},
        },
        {
          title: '电影',
          data: {},
        },
        {
          title: '结婚',
          data: {},
        },
        {
          title: '教培',
          data: {},
        },
        {
          title: '家装',
          data: {},
        },
        {
          title: '亲子',
          data: {},
        },
      ],
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: [],
    };
  }

  callback = value => {
    console.log(value);
  };

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(
      () =>
        this.setState({
          height: hei,
          data: genData(),
        }),
      0,
    );
  }

  render() {
    const { isLogin, route } = this.props;
    const { tabs } = this.state;
    return (
      <div>
        {isLogin ? (
          <Fragment>
            <div className={styles.header}>
              <span>热门内容</span>
            </div>
            <Tabs defaultActiveKey="0" onChange={this.callback}>
              {tabs.map((v, i) => {
                return (
                  <TabPane tab={v.title} key={i}>
                    <PullToRefresh
                      damping={60}
                      ref={el => (this.ptr = el)}
                      style={{
                        height: this.state.height,
                        overflow: 'auto',
                      }}
                      indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                      direction={this.state.down ? 'down' : 'up'}
                      refreshing={this.state.refreshing}
                      onRefresh={() => {
                        this.setState({ refreshing: true });
                        setTimeout(() => {
                          this.setState({ refreshing: false });
                        }, 1000);
                      }}
                    >
                      {this.state.data.map(i => (
                        <div key={i} style={{ textAlign: 'center', padding: 20 }}>
                          {this.state.down ? 'pull down' : 'pull up'} {i}
                        </div>
                      ))}
                    </PullToRefresh>
                  </TabPane>
                );
              })}
            </Tabs>
            <TabBar />
          </Fragment>
        ) : (
          <Redirect to={{ pathname: '/login', query: { url: route.path.substr(1) } }} />
        )}
      </div>
    );
  }
}
