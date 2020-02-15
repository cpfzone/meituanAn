import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';

@connect(state => {
  return {
    isLogin: state.user.isLogin,
  };
}, null)
class index extends Component {
  render() {
    const { isLogin, route } = this.props;
    return (
      <Fragment>
        {isLogin ? (
          <div>我是账号页面</div>
        ) : (
          <Redirect to={{ pathname: '/login', query: { url: route.path.substr(1) } }} />
        )}
      </Fragment>
    );
  }
}

export default index;
