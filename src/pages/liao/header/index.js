import React, { Component } from 'react';
import styles from './index.less';
import { Popover } from 'antd-mobile';
import { Icon } from 'antd';

const Item = Popover.Item;

const myImg = src => (
  <img
    src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`}
    className="am-icon am-icon-xs"
    alt=""
  />
);

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <div className={styles.navbarLiao}>
        <div className={styles.navbArLeftLiao}>
          <div className={styles.navbarLiaoUser}>
            <span className="iconfont icon-ren"></span>
          </div>
        </div>
        <span className={styles.navbarHeaderLiao}>聊天</span>
        <div className={styles.navbArRightLiao}>
          <div className={styles.navbarLiaoJia}>
            <Popover
              mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                <Item key="2" value="dan" icon={<Icon type="user-add" />}>
                  添加好友
                </Item>,
                <Item key="3" value="qun" icon={<Icon type="usergroup-add" />}>
                  创建群聊
                </Item>,
                <Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">
                  扫一扫
                </Item>,
                <Item
                  key="5"
                  value="special"
                  icon={myImg('PKAgAqZWJVNwKsAJSmXd')}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  我的名片
                </Item>,
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div
                style={{
                  height: '100%',
                  padding: '0 15px',
                  marginRight: '-15px',
                  display: 'flex',
                  alignItems: 'center',
                  boxSizing: 'content-box',
                }}
              >
                <span className="iconfont icon-hao"></span>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}
