import React, { Component, Fragment } from 'react';
import TabBar from '../../components/TabBar';
import { NoticeBar, List, Badge } from 'antd-mobile';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import Header from './header';
import styles from './index.less';
import { Drawer, Collapse } from 'antd';
import Link from 'umi/link';

const Item = List.Item;
const Brief = Item.Brief;
const { Panel } = Collapse;

export default
@connect(
  state => {
    return {
      isLogin: state.user.isLogin,
      userinfo: state.user.userinfo,
      friendsList: state.liao.friendsList,
    };
  },
  {
    getFriendsList: id => ({
      type: 'liao/firendsList',
      id,
    }),
    submitFriends: value => ({
      type: 'liao/submitFriend',
      value,
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      friends: true,
    };
  }

  showDrawer = () => {
    this.props.getFriendsList(this.props.userinfo._id);
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handlerChangeFriends = id => {
    if (this.state.friends) {
      this.props.getFriendsList(id);
      this.setState({
        friends: false,
      });
    }
  };

  render() {
    const { isLogin, route, friendsList, userinfo } = this.props;
    userinfo && this.handlerChangeFriends(userinfo._id);
    const arr1 = []; //没有添加的好友
    const arr2 = []; //已经添加好友的列表
    friendsList.forEach(v => {
      if (v.password != 1) {
        arr1.push(v);
      } else {
        arr2.push(v);
      }
    });
    return (
      <div>
        {isLogin ? (
          <Fragment>
            {userinfo ? (
              <Fragment>
                {/* 头部 */}
                <Header changeUserList={this.showDrawer} />
                {/* 滚动信息栏 */}
                <NoticeBar
                  mode="closable"
                  marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}
                >
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
                      <List>
                        {arr1.length === 0 ? (
                          <Item>空</Item>
                        ) : (
                          arr1.map((v, i) => {
                            return (
                              <Item
                                key={i}
                                thumb={<img src={v.avatar} alt="头像" />}
                                extra={
                                  v.password == 2 ? (
                                    <button
                                      className={styles.rightBtnLIst}
                                      onClick={() => {
                                        this.setState({
                                          visible: false,
                                        });
                                        this.props.submitFriends({
                                          id: v._id,
                                          dui: this.props.userinfo._id,
                                        });
                                      }}
                                    >
                                      同意
                                    </button>
                                  ) : (
                                    <span>等待同意</span>
                                  )
                                }
                              >
                                {v.name}
                              </Item>
                            );
                          })
                        )}
                      </List>
                    </Panel>
                    <Panel header="好友列表" key="2">
                      <List>
                        {arr2.length === 0 ? (
                          <Item>空</Item>
                        ) : (
                          arr2.map((v, i) => {
                            return (
                              <Item
                                key={i}
                                thumb={<img src={v.avatar} alt="头像" />}
                                arrow="horizontal"
                              >
                                {v.name}
                              </Item>
                            );
                          })
                        )}
                      </List>
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
                  {arr2.map((v, i) => {
                    return (
                      <Link key={i} to={{ pathname: `/liao/${v._id}/${v.name}` }}>
                        <Item
                          extra={
                            <Fragment>
                              <span>10:30</span>
                              <br />
                              <Badge text={1} />
                            </Fragment>
                          }
                          thumb={v.avatar}
                        >
                          {v.name}
                          <Brief className={styles.contentLiaoFu}>
                            感谢你的注册于支持,如果有任何意见欢迎提出
                          </Brief>
                        </Item>
                      </Link>
                    );
                  })}
                </List>
                <TabBar />
              </Fragment>
            ) : (
              <div>数据加载中</div>
            )}
          </Fragment>
        ) : (
          <Redirect to={{ pathname: '/login', query: { url: route.path.substr(1) } }} />
        )}
      </div>
    );
  }
}
