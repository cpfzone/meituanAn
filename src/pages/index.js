import React, { Component } from 'react';
import styles from './index.less';
import Link from 'umi/link';
import { Carousel, WingBlank } from 'antd-mobile';
import data from '../data/header.json';

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
        <div className={styles.banner_download}>
          <div className={styles.bannerItem}>
            <img
              className={styles.imgBox}
              src="https://p1.meituan.net/travelcube/7264ce9c25de2e464e3acd996fe8ad362803.png"
              alt="logo"
            />
            <div className={styles.logoTheme}>
              <p className={styles.logoTit}>省钱利器 购物超划算</p>
              <p className={styles.logoDesc}>吃喝玩乐尽在美团</p>
            </div>
          </div>
          <div className={styles.toAppBtn}>
            <span className={styles.callApp}>去APP</span>
          </div>
        </div>
        <div className={styles.listIn}>
          <WingBlank>
            <Carousel
              autoplay={false}
              infinite
              swipeSpeed={5}
              dotStyle={{ position: 'relative', top: '10px' }}
              dotActiveStyle={{
                backgroundColor: '#FE8C00',
                position: 'relative',
                top: '10px',
              }}
            >
              {data.data.map((item, index) => {
                return (
                  <ul key={index} className={styles.contentList}>
                    {item.children.map((v, i) => {
                      return (
                        <li key={i} className={styles.icon}>
                          <Link to={v.url}>
                            <span
                              style={{ background: v.bg }}
                              className={[styles.newIconCircle, 'iconfont', v.icon].join(' ')}
                            ></span>
                            <span className={styles.iconDesc}>{v.text}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </Carousel>
          </WingBlank>
        </div>
      </div>
    );
  }
}
