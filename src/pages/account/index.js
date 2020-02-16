import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import Footer from '../footer/index';
import Header from '../header/index';
import styles from './index.less';
import Link from 'umi/link';

@connect(state => {
  return {
    isLogin: state.user.isLogin,
    userinfo: state.user.userinfo,
  };
}, null)
class index extends Component {
  render() {
    const { isLogin, route, userinfo } = this.props;
    return (
      <Fragment>
        <Header title="我的美团" account={true} />
        {isLogin ? (
          <Fragment>
            {userinfo === null ? (
              <div>1</div>
            ) : (
              <Fragment>
                <Link to="/account/myinfo" className={styles.myUserInfo}>
                  <img
                    src="//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:d5896c44/touch/img/my-photo.png"
                    alt="header"
                  />
                  <img
                    src="https://img.meituan.net/avatar/4ba9758be0a301ef9e3d8f45e472b1563720.jpg"
                    alt="avatar"
                    className={styles.avater}
                  />
                  <div className={styles.userinfoMore}>
                    <p className={styles.userInfoName}>
                      {userinfo.name}
                      <i
                        className={[styles.levelDemo, styles['level' + userinfo.level]].join(' ')}
                      ></i>
                    </p>
                    <p>
                      账户余额：<strong>0</strong>元
                    </p>
                  </div>
                </Link>
                <div className={styles.Gekai}></div>
                <dl className={styles.list}>
                  <dd>
                    <Link to="/account/order">
                      <div className={styles.moreOrder}>
                        <i className={styles.orderI}>
                          <span className="iconfont icon-dingdan"></span>
                        </i>
                        全部订单
                        <span className={styles.orderAfter}></span>
                      </div>
                    </Link>
                  </dd>
                  <dd>
                    <ul className={styles.orderIndex}>
                      <li>
                        <Link to="/account/order?state=1" className={styles.react}>
                          <i className={styles.textIcon}>
                            <span className="iconfont icon-fukuan"></span>
                          </i>
                          <span>代付款</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/account/order?state=1" className={styles.react}>
                          <i className={styles.textIcon}>
                            <span className="iconfont icon-using_help"></span>
                          </i>
                          <span>代使用</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/account/order?state=1" className={styles.react}>
                          <i className={styles.textIcon}>
                            <span className="iconfont icon-evaluate"></span>
                          </i>
                          <span>代评价</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/account/order?state=1" className={styles.react}>
                          <i className={styles.textIcon}>
                            <span className="iconfont icon-tuikuan"></span>
                          </i>
                          <span>退款/售后</span>
                        </Link>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <div className={styles.Gekai}></div>
                <dl className={styles.list}>
                  <dd>
                    <Link to="/account/collection"></Link>
                  </dd>
                  <dd></dd>
                  <dd></dd>
                  <dd></dd>
                </dl>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Redirect to={{ pathname: '/login', query: { url: route.path.substr(1) } }} />
        )}
        <Footer />
      </Fragment>
    );
  }
}

export default index;
