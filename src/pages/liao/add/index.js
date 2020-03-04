import React, { Component } from 'react';
import Header from '../../header';
import { SearchBar, WhiteSpace, List } from 'antd-mobile';
import { Icon, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const Item = List.Item;

export default
@connect(
  state => {
    return {
      addUsers: state.liao.addUsers,
      userInfo: state.user.userinfo,
    };
  },
  {
    getLiaoAddUser: value => ({
      type: 'liao/add',
      value,
    }),
    tianUser: value => ({
      type: 'liao/tian',
      value,
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      show: true,
      kai: false,
      tian: null,
    };
  }

  onChange = value => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };

  render() {
    const { value, show, kai, tian } = this.state;
    const { addUsers, userInfo } = this.props;
    userInfo &&
      userInfo.haos.forEach(v => {
        addUsers.forEach(item => {
          if (item._id === v.dui) {
            if (v.que === false) {
              // 等待验证
              item.yan = '等待验证';
            }
            if (v.que === true) {
              // 已经同意
              item.yan = '已经同意';
            }
          }
        });
      });
    return (
      <div>
        <Header title="加好友" rightShow={true} />
        <SearchBar
          onSubmit={() => {
            this.setState({ kai: true });
            this.props.getLiaoAddUser({ name: userInfo.phone, value });
          }}
          onClear={this.clear}
          onChange={this.onChange}
          placeholder="目前只限输入对方手机号"
          maxLength={11}
          onFocus={() =>
            this.setState({
              show: false,
            })
          }
        />
        <WhiteSpace />
        {show ? (
          <div>
            <List renderHeader={() => '下列功能均在开发中'}>
              <Item thumb={<Icon type="scan" />} arrow="horizontal">
                扫一扫添加好友
              </Item>
              <Item arrow="horizontal" thumb={<Icon type="user-add" />}>
                添加附近的好友
              </Item>
              <Item arrow="horizontal" thumb={<Icon type="tag" />}>
                通过标签添加好友
              </Item>
            </List>
          </div>
        ) : (
          <List>
            {addUsers.map((v, i) => {
              return (
                <Item
                  key={i}
                  thumb={<img src={v.avatar} alt="图片" />}
                  extra={
                    tian === i ? (
                      <span>等待验证</span>
                    ) : v.yan ? (
                      <span>{v.yan}</span>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => {
                          this.setState({
                            tian: i,
                          });
                          this.props.tianUser({ wo: userInfo._id, dui: v._id });
                        }}
                      >
                        添加好友
                      </Button>
                    )
                  }
                >
                  {v.name}
                </Item>
              );
            })}
            {addUsers.length === 0 && kai && <span className={styles.noAdd}>没有搜到好友</span>}
          </List>
        )}
      </div>
    );
  }
}
