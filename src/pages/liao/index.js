import React, { Component, Fragment } from 'react';
import TabBar from '../../components/TabBar';
import { NoticeBar } from 'antd-mobile';
import { connect } from 'dva';
import Redirect from 'umi/redirect';

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
            <NoticeBar mode="closable" marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
              此模块功能还在不断完善,bug可能会比较常见
            </NoticeBar>
            <TabBar />
          </Fragment>
        ) : (
          <Redirect to={{ pathname: '/login', query: { url: route.path.substr(1) } }} />
        )}
      </div>
    );
  }
}
