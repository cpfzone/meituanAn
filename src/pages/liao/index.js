import React, { Component, Fragment } from 'react';
import TabBar from '../../components/TabBar';
import { NoticeBar, List, Badge } from 'antd-mobile';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import Header from './header';
import styles from './index.less';

const Item = List.Item;
const Brief = Item.Brief;

export default
@connect(state => {
  return {
    isLogin: state.user.isLogin,
  };
}, null)
class index extends Component {
  render() {
    const { isLogin, route } = this.props;
    return (
      <div>
        {isLogin ? (
          <Fragment>
            <Header />
            <NoticeBar mode="closable" marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
              此模块功能还在不断完善,bug可能会比较常见
            </NoticeBar>
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
