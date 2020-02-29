import React, { Component, Fragment } from 'react';
import TabBar from '../../components/TabBar';
import { connect } from 'dva';
import styles from './index.less';
import { Tabs } from 'antd';
import { PullToRefresh } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { Card, Row, Col, Avatar } from 'antd';
import group from '../../../utils/arr';
import Link from 'umi/link';

const { TabPane } = Tabs;

export default
@connect(
  state => {
    return {
      hotList: state.list.hotList,
      refreshing: state.list.refreshing,
    };
  },
  {
    getArrList: () => ({
      type: 'list/hotData',
    }),
    changeRef: () => ({
      type: 'list/refChange',
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: ['全部', '旅行', '丽人', '电影', '结婚', '教培', '家装', '亲子'],
      down: true,
      height: document.documentElement.clientHeight,
      tags: '',
      suo: 0,
    };
  }

  callback = value => {
    const name = this.state.tabs[value];
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
    if (this.props.hotList.length === 0) {
      this.props.getArrList();
    }
  }

  render() {
    let { hotList, refreshing } = this.props;
    const { tabs, tags, suo } = this.state;
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
        <Link key={index} to={{ pathname: '/hot/detail/' + item._id }}>
          <Card
            hoverable
            bodyStyle={{ padding: '24px 10px' }}
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
        </Link>
      )),
    );

    return (
      <div className={styles.containerHot}>
        <Fragment>
          <div className={styles.header}>
            <span>热门内容</span>
          </div>
          <Tabs size="small" tabBarGutter={5} defaultActiveKey="0" onChange={this.callback}>
            {tabs.map((v, i) => {
              return (
                <TabPane tab={v} key={i}>
                  <PullToRefresh
                    damping={60}
                    ref={el => (this.ptr = el)}
                    style={{
                      height: this.state.height,
                      overflow: 'auto',
                    }}
                    refreshing={refreshing}
                    onRefresh={() => {
                      this.props.changeRef();
                      this.props.getArrList();
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
      </div>
    );
  }
}
