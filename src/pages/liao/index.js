import React, { Component, Fragment } from 'react';
import TabBar from '../../components/TabBar';
import { NoticeBar, List, Badge } from 'antd-mobile';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import Header from './header';
import styles from './index.less';
import { Drawer, Collapse } from 'antd';

const Item = List.Item;
const Brief = Item.Brief;
const { Panel } = Collapse;

export default
@connect(state => {
  return {
    isLogin: state.user.isLogin,
    userinfo: state.user.userinfo,
  };
}, null)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { isLogin, route } = this.props;
    return (
      <div>
        {isLogin ? (
          <Fragment>
            {/* 头部 */}
            <Header changeUserList={this.showDrawer} />
            {/* 滚动信息栏 */}
            <NoticeBar mode="closable" marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
              此模块功能还在不断完善,bug可能会比较常见
            </NoticeBar>
            <Drawer
              title="好友列表"
              placement="left"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <Collapse accordion>
                <Panel header="添加邀请" key="1">
                  <p>空</p>
                </Panel>
                <Panel header="好友列表" key="2">
                  <p>空</p>
                </Panel>
              </Collapse>
            </Drawer>
            {/* 用户列表 */}
            <List className="my-list">
              <Item
                extra={
                  <Fragment>
                    <span>10:30</span>
                    <br />
                    <Badge text={1} />
                  </Fragment>
                }
                align=""
                thumb="https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/20200303225014.png"
                multipleLine
              >
                美团开发团队工作人员{' '}
                <Brief className={styles.contentLiaoFu}>
                  感谢你的注册于支持,如果有任何意见欢迎提出
                </Brief>
              </Item>
            </List>
            <TabBar />
          </Fragment>
        ) : (
          <Redirect to={{ pathname: '/login', query: { url: route.path.substr(1) } }} />
        )}
      </div>
    );
  }
}
