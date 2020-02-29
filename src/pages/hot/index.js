import React, { Component, Fragment } from 'react';
import TabBar from '../../components/TabBar';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import styles from './index.less';
import { Tabs } from 'antd';
import { PullToRefresh } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { Card, Row, Col, Avatar } from 'antd';
import group from '../../../utils/arr';

const { TabPane } = Tabs;

export default
@connect(
  state => {
    return {
      isLogin: state.user.isLogin,
      hotList: state.list.hotList,
    };
  },
  {
    getArrList: () => ({
      type: 'list/hotData',
    }),
  },
)
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
      tags: '',
    };
  }

  callback = value => {
    const name = this.state.tabs[value].title;
    this.setState({
      tags: name,
    });
  };

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(
      () =>
        this.setState({
          height: hei,
        }),
      0,
    );
    this.props.getArrList();
  }

  render() {
    let { isLogin, route, hotList } = this.props;
    const { tabs, tags } = this.state;
    let arr = [];
    if (hotList.length > 0) {
      let xin = hotList;
      // 过滤
      if (!(tags == '' || tags == '全部')) {
        xin = hotList.filter(v => {
          return v.select == tags;
        });
      }
      // 分组,瀑布流
      arr = group(xin, xin.length / 2);
    }

    const MapList = arr.map(list =>
      list.map((item, index) => (
        <Card
          hoverable
          bodyStyle={{ padding: '24px 10px' }}
          key={index}
          style={{ marginBottom: '10px' }}
          cover={<img alt="example" src={item.imgUrls[0].url} />}
        >
          <Card.Meta
            title={<span className={styles.titleMeta}>{item.title}</span>}
            description={
              <div className={styles.containerImgHot}>
                <div className={styles.userImg}>
                  <Avatar src={item.avatar} />
                  <span className={styles.deactivateMeta}>{item.name}</span>
                </div>
                <div className={styles.likeMeta}>
                  <span className="iconfont icon-xin"></span>
                  <span className={styles.xiangYouMeta}>{item.adds.length}</span>
                </div>
              </div>
            }
          />
        </Card>
      )),
    );

    return (
      <div className={styles.containerHot}>
        {isLogin ? (
          <Fragment>
            <div className={styles.header}>
              <span>热门内容</span>
            </div>
            <Tabs size="small" tabBarGutter={5} defaultActiveKey="0" onChange={this.callback}>
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
                      <Row>
                        <Col span={1}></Col>
                        <Col span={11}>{MapList[0]}</Col>
                        <Col span={1}></Col>
                        <Col span={10}>{MapList[1]}</Col>
                        <Col span={1}></Col>
                      </Row>
                      <div style={{ height: '100px' }}></div>
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
