import React, { Component } from 'react';
import styles from './index.less';
import Link from 'umi/link';

export default class index extends Component {
  render() {
    return (
      <footer>
        <div className={styles.footerNav}>
          <div className={styles.pullRight}>
            <span className={styles.m_city}>城市</span>
            <img
              src="https://p1.meituan.net/travelcube/c6c04160817d530ecddf9f86b158106e2032.png"
              className={styles.icn_local}
              alt="logo"
            />
            <Link to="/changeCity" className={styles.city_name_a}>
              北京
            </Link>
          </div>
          <Link to="/login" className={styles.btn}>
            登录
          </Link>
          <em></em>
          <Link to="/register" className={styles.btn}>
            注册
          </Link>
        </div>
        <div className={styles.footerBar}>
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/account">我的</Link>
            </li>
            <li>
              <Link to="/app">美团下载</Link>
            </li>
            <li>
              <Link to="/">电脑版</Link>
            </li>
            <li>
              <Link to="/help">帮助</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerLink}>
          友情链接
          <Link to="/">猫眼电影</Link>
          <Link to="/">大众点评</Link>
          <Link to="/">美团旅行</Link>
          <Link to="/">珍果民宿</Link>
          <Link to="/">大众点评下载</Link>
          <Link to="/">美团收银官网</Link>
          <Link to="/">美团点评餐饮学院</Link>
          <Link to="/">快驴进货商家合作</Link>
        </div>
        <div className={styles.copyright}>
          <div className={styles.hr}></div>
          <span>©2020 美团网 京ICP证070791号</span>
        </div>
      </footer>
    );
  }
}
