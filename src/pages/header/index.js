import React, { Component, Fragment } from 'react';
import styles from './index.less';
import Link from 'umi/link';
import router from 'umi/router';

export default class index extends Component {
  returnTip = () => {
    if (window.location.pathname === '/account') {
      router.push('/');
    } else {
      router.go(-1);
    }
  };

  render() {
    const { title, account } = this.props;
    return (
      <Fragment>
        <header id="account" className={styles.accountHeader}>
          <div className={styles.navWarpLeft}>
            <span onClick={this.returnTip}>
              <img
                src="https://p1.meituan.net/travelcube/53361fd0bb6b333e779377789a8d669e531.png"
                alt="return"
              />
            </span>
          </div>
          <span className={styles.accountSpan}>{title}</span>
          {account ? (
            <div className={styles.navWarpRight}>
              <Link to="/">
                <span>
                  <img
                    src="https://p1.meituan.net/travelcube/142ba119b889881105236ef57446e6bf866.png"
                    alt="搜索"
                  />
                </span>
              </Link>
              <Link to="/search">
                <span>
                  <img
                    src="https://p0.meituan.net/travelcube/4b45dc09c35f9175498345f8672d08991022.png"
                    alt="搜索"
                  />
                </span>
              </Link>
            </div>
          ) : null}
        </header>
      </Fragment>
    );
  }
}
