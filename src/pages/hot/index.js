import React, { Component, Fragment } from 'react';
import TabBar from '../../components/TabBar';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import styles from './index.less';

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
            <div className={styles.header}>
              <span>热门内容</span>
            </div>
            <TabBar />
          </Fragment>
        ) : (
          <Redirect to={{ pathname: '/login', query: { url: route.path.substr(1) } }} />
        )}
      </div>
    );
  }
}
