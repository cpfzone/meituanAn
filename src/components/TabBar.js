import { TabBar } from 'antd-mobile';
import React, { Component } from 'react';
import styles from './index.less';
import widthRouter from 'umi/withRouter';

export default
@widthRouter
class TabBarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        {
          title: '首页',
          url: 'home',
          selectedTab: '/',
        },
        {
          title: '热门推荐',
          selectedTab: '/hot',
          url: 'tui',
          badge: 'new',
        },
        {
          title: '聊天',
          url: 'chat',
          selectedTab: '/liao',
          badge: 1,
        },
        {
          title: '我的',
          url: 'my',
          selectedTab: '/account',
          dot: true,
        },
      ],
    };
  }

  render() {
    const { pathname } = this.props.location;
    return (
      <div className={styles.TabBar}>
        <TabBar unselectedTintColor="#949494" tintColor="#ffd000" barTintColor="white">
          {this.state.arr.map((v, i) => {
            return (
              <TabBar.Item
                title={v.title}
                key={i}
                icon={{
                  uri: `https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/${v.url}.svg`,
                }}
                selectedIcon={{
                  uri: `https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/${v.url}_select.svg`,
                }}
                dot={v.dot}
                badge={v.badge}
                onPress={() => {
                  this.props.history.push(v.selectedTab);
                }}
                selected={pathname === v.selectedTab}
              ></TabBar.Item>
            );
          })}
        </TabBar>
      </div>
    );
  }
}
