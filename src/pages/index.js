import React, { Component } from 'react';
import styles from './index.less';
import Link from 'umi/link';

export default class index extends Component {
  render() {
    return (
      <div>
        <header className={styles.navbar}>
          <div className={styles.navbarLeft}>
            <Link to="/changeCity" className={styles.react}>
              <span className={styles.cityNav}>
                北京
                <em></em>
                <img
                  src="https://p0.meituan.net/travelcube/45c79a92755b54adc9dc1c4682b123b3201.png"
                  alt="down"
                  className={styles.icn_down}
                />
              </span>
            </Link>
          </div>
          <div className={styles.boxSearch}>
            <Link to="/search">
              <img
                src="https://p0.meituan.net/travelcube/99c29829cf1b85d5cdbc76a1bd0b7329814.png"
                alt="search"
                className={styles.icn_search}
              />
              <span className={styles.singleLine}>请输入商家名、品类或者商圈...</span>
            </Link>
          </div>
          <div className={styles.navbarRight}>
            <Link to="/acount" className={[styles.react, styles.right_nav].join(' ')}>
              <span className={styles.NavBtn}>
                <img
                  src="https://p0.meituan.net/travelcube/641521461179df7cfb88738dd1ea11ec1031.png"
                  className={styles.icn_mine}
                  alt="logo"
                />
              </span>
            </Link>
          </div>
        </header>
      </div>
    );
  }
}
